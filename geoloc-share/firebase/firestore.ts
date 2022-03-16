import { addDoc, collection, getFirestore } from 'firebase/firestore';

export const defaultCollectionPath = "/test";

export const setDocument = (collectionPath: string, data: any) => {
  const db = getFirestore();
  return addDoc(collection(db, collectionPath), data);
};
