import { QueryClient } from "@tanstack/react-query";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Assuming you have your db instance exported from a firebase.js file

export const queryClient = new QueryClient();

interface formType {
  name: string;
  location: string;
  date: string;
  description: string;
}
export const createEvent = async (eventData: formType) => {
  try {
    const docRef = await addDoc(collection(db, "events"), eventData);
    console.log("Document written with ID: ", docRef.id);
    // You can return the ID or the whole docRef if needed
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    // You can re-throw the error or handle it gracefully
    throw e;
  }
};

export interface EventType {
  id: string;
  name: string;
  location: string;
  date: string;
  description: string;
}
export const getEvents = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "events"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as EventType[];

    return data;
  } catch (e) {
    console.error("Error getting events: ", e);
    // You can re-throw the error or handle it gracefully
    throw e;
  }
};

// Example usage in a React component or other part of your app:
// addEvent({ name: "My Event", date: "2026-06-01" });
