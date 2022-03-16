import { orderBy } from 'firebase/firestore';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import LocationList from '../components/LocationList';
import { Surface } from '../components/Surface';
import { defaultCollectionPath, FirebaseConfig, initializeFirebase } from '../firebase';
import { useListenCollection } from '../hooks/useListenCollection';
import { Location } from '../models/Location';
import styles from '../styles/Home.module.css';

const LocationMapWithNoSSR = dynamic(() => import("../components/LocationMap"), {
  ssr: false,
  loading: () => <div className={styles.mapLoading}>Loading map...</div>,
});

type Props = {
  collectionPath: string;
  firebaseConfig: FirebaseConfig;
};

export default function Home({ collectionPath, firebaseConfig }: Props) {
  const firebaseConfigMissing = firebaseConfig.apiKey === "";
  if (!firebaseConfigMissing) initializeFirebase(firebaseConfig);

  const [selectedLocationId, setSelectedLocationId] = useState<string>("");
  const locations = useListenCollection<Location>(collectionPath, [orderBy("timestamp", "desc")]);

  useEffect(() => {
    if (locations) setSelectedLocationId(locations[0]?.id);
  }, [locations]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {firebaseConfigMissing ? (
          <div style={{ color: "white" }}>There was a problem loading firebase config. Check the envrionment variables.</div>
        ) : null}

        {locations && locations[0] ? (
          <>
            <Surface elevation={3}>
              <LocationMapWithNoSSR
                setSelectedLocationId={setSelectedLocationId}
                locations={locations}
                selectedLocationId={selectedLocationId}
              />
            </Surface>

            <LocationList locations={locations} selectedLocationId={selectedLocationId} setSelectedLocationId={setSelectedLocationId} />
          </>
        ) : (
          <div style={{ color: "white" }}>There is no location info shared yet.</div>
        )}
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
