import { useEffect, useState } from "react";
import { collection, getFirestore, onSnapshot, query, QueryConstraint } from "firebase/firestore";

export const useListenCollection = <T extends { id: string }>(collectionPath: string, constraints?: QueryConstraint[]) => {
  const [items, setItems] = useState<T[]>();
  const db = getFirestore();

  const dbCollection = collection(db, collectionPath);
  const q = constraints ? query(dbCollection, ...constraints) : dbCollection;

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs: T[] = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.ref.id } as T;
      });

      setItems(docs);
    });

    return () => unsubscribe();
  }, []);

  return items;
};
