// firebase
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

import Input from "../components/form/Input";
import TextArea from "../components/form/TextArea";

const EventForm = () => {
  const addEvent = async () => {
    try {
      const docRef = await addDoc(collection(db, "events"), {
        title: "My Event",
        date: "2026-04-30",
        location: "Kolkata",
        createdAt: new Date(),
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <>
      <h1 className="pb-5">Add new event</h1>
      <button onClick={addEvent}>testing btn</button>
      <form action="" className="bg-[#e2e8f0] py-5 px-8 rounded-2xl w-125">
        <div className="py-2 flex-col flex">
          <Input label="Event name" name="event-name" required />
        </div>
        <div className="py-2 flex-col flex">
          <Input label="Event location" name="location" />
        </div>
        <div className="py-2 flex-col flex">
          <Input label="Event date" name="date" type="date" />
        </div>
        <div className="py-2 flex-col flex mb-5">
          <TextArea label="Event description" name="date" />
        </div>
        <button className="cursor-pointer dark:bg-gray-800 dark:text-white py-2 px-5 rounded">
          Submit
        </button>
      </form>
    </>
  );
};

export default EventForm;
