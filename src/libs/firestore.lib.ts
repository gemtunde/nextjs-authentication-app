import { dataStore } from '@/config/firebase.config';

import {
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

const itemCollection = collection(dataStore, 'items');
export const saveItem = async (data) => {
  const result = await addDoc(itemCollection, { ...data });
};
export const getItemList = async () => {
  const querySnapshot = await getDocs(itemCollection);
  querySnapshot.forEach((item) => {
    console.log(item.id, ' => ', item.data());
  });
};
export const updateItem = async (id, data) => {
  const docRef = doc(itemCollection, id);
  const snapshot = await updateDoc(docRef, { ...data });

  console.log('Document updated', snapshot);
};
export const deleteItem = async (id) => {
  const docRef = doc(itemCollection, id);
  const snapshot = await deleteDoc(docRef);

  console.log('Document deleted', snapshot);
};
