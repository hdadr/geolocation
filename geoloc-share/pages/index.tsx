import { useEffect, useState } from 'react';

import Button from '../components/Button';
import DeviceLocation from '../components/DeviceLocation';
import Header from '../components/Header';
import KeyValue from '../components/KeyValue';
import SnackBar, { Snackbar } from '../components/SnackBar';
import { FirebaseConfig, initializeFirebase } from '../firebase';
import { defaultCollectionPath, setDocument } from '../firebase/firestore';
import useLocalStorage from '../hooks/useLocalStorage';
import { useLocation } from '../hooks/useLocation';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { Location } from '../models/Location';
import styles from '../styles/Index.module.css';
import { getAddressFromCoords } from '../utils/geocoding';

type Props = {
  collectionPath: string;
  firebaseConfig: FirebaseConfig;
};

export default function Home({ collectionPath, firebaseConfig }: Props) {
  const hasFirebaseConfig = firebaseConfig.apiKey !== "";
  if (hasFirebaseConfig) initializeFirebase(firebaseConfig);

  const { location, updateLocation } = useLocation();
  const online = useOnlineStatus();
  const [loading, setLoading] = useState(false);
  const [scheduledLocations, setScheduledLocations] = useLocalStorage<Location[]>("awaiting-upload", []);
  const [snackbar, setSnackbar] = useState<Snackbar>({ show: false, type: "success", text: "" });

  const handleLocationUpdate = () => {
    updateLocation();
    setSnackbar({ show: true, type: "success", text: "Location info updated." });
  };

  const handleLocationSave = () => {
    setLoading(true);
    setDocument(collectionPath, location)
      .then(() => {
        setSnackbar({ show: true, type: "success", text: "Successfully saved!" });
      })
      .catch(() => {
        setSnackbar({ show: true, type: "error", text: "Something went wrong, try again!" });
      })
      .finally(() => setLoading(false));
  };

  const scheduleLocationToUpload = () => {
    if (!location) return;

    setScheduledLocations([...scheduledLocations, location]);
    setSnackbar({ show: true, type: "success", text: "Scheduled!" });
  };

  const uploadScheduledLocations = () => {
    const failedUploads: Location[] = [];

    scheduledLocations.forEach(async (locationInfo: Location) => {
      const { latitude, longitude } = locationInfo.coords;
      try {
        const address = await getAddressFromCoords(latitude, longitude);
        await setDocument(collectionPath, { ...locationInfo, address });
      } catch (error) {
        failedUploads.push(locationInfo);
      }
    });

    setScheduledLocations(failedUploads);
  };

  useEffect(() => {
    const hasScheduledLocations = scheduledLocations?.length > 0;
    if (online && hasScheduledLocations) {
      uploadScheduledLocations();
    }
  }, [online]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Header online={online} handleLocationUpdate={handleLocationUpdate} />

        <DeviceLocation location={location} />

        <div className={styles.button}>
          {online ? (
            <Button onClick={handleLocationSave} loading={loading}>
              Save Info
            </Button>
          ) : (
            <>
              <div className={styles.scheduleMessage}>
                <div>You can schedule to upload the location later.</div>
                <KeyValue keyTitle="Scheduled" value={scheduledLocations.length} />
              </div>

              <Button onClick={scheduleLocationToUpload} loading={loading}>
                Schedule
              </Button>
            </>
          )}
        </div>

        {snackbar.show ? (
          <SnackBar
            show={snackbar.show}
            type={snackbar.type}
            text={snackbar.text}
            onClose={() => setSnackbar((x) => ({ ...x, show: false }))}
          />
        ) : null}
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const collectionPath = process.env.collectionPath;

  const firebaseConfig: FirebaseConfig = {
    apiKey: process.env.apiKey ? process.env.apiKey : "",
    authDomain: process.env.authDomain ? process.env.authDomain : "",
    projectId: process.env.projectId ? process.env.projectId : "",
    storageBucket: process.env.storageBucket ? process.env.storageBucket : "",
    messagingSenderId: process.env.messagingSenderId ? process.env.messagingSenderId : "",
    appId: process.env.appId ? process.env.appId : "",
  };

  return collectionPath
    ? { props: { collectionPath, firebaseConfig } }
    : { props: { collectionPath: defaultCollectionPath, firebaseConfig } };
}
