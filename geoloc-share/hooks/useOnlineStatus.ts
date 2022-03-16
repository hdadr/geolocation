import { useEffect, useState } from 'react';

const getOnlineStatus = () => {
  return typeof navigator !== "undefined" && typeof navigator.onLine === "boolean" ? navigator.onLine : true;
};

export const useOnlineStatus = () => {
  const [onlineStatus, setOnlineStatus] = useState<boolean>(getOnlineStatus());

  const onOnline = () => setOnlineStatus(true);
  const onOffline = () => setOnlineStatus(false);

  useEffect(() => {
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);

    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  return onlineStatus;
};
