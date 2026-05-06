import { QueryClient } from "@tanstack/react-query";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase"; // Assuming you have your db instance exported from a firebase.js file

// types
import { EventType, formType } from "../types/event";

export const queryClient = new QueryClient();

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

export const getEvents = async (): Promise<EventType[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "events"));

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        name: data.name,
        location: data.location,
        date: data.date,
        description: data.description,
      };
    });
  } catch (error) {
    console.error("Error getting events:", error);

    throw new Error("Failed to fetch events");
  }
};

export const deleteEvent = async (id) => {
  try {
    if (!id) {
      throw new Error("Event id is empty");
    }
    const response = await deleteDoc(doc(db, "events", id));
  } catch (error) {
    console.error("Error deleting event", error);
    throw new Error("Failed to delete event");
  }
};
