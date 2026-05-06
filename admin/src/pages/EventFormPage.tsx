// react hooks
import { useState } from "react";

// firebase
import { useMutation } from "@tanstack/react-query";

import { createEvent } from "../api/events";

// utils
import Input from "../components/form/Input";
import TextArea from "../components/form/TextArea";

// types
import { FormType } from "../types/event";
import { log } from "firebase/firestore/lite/pipelines";

const initFormData: FormType = {
  name: "",
  location: "",
  date: "",
  description: "",
};
const EventForm = () => {
  const [formInputs, setFormInputs] = useState<FormType>(initFormData);
  const { mutate } = useMutation({
    mutationFn: createEvent,
  });

  const formHandler = async (event: React.SubmitEvent) => {
    event.preventDefault();
    try {
      const name = formInputs.name?.toString() || "";
      const location = formInputs.location?.toString() || "";
      const date = formInputs.date?.toString() || "";
      const description = formInputs.description?.toString() || "";

      const eventDetail = {
        name,
        location,
        date,
        description,
      };

      mutate(eventDetail);
    } catch (error) {}
  };

  const handleFieldInput = (name: string, value: string) => {
    if (!value) return;

    setFormInputs((prevStateData: FormType) => {
      return {
        ...prevStateData,
        [name]: value,
      };
    });

    console.log("formInputs", formInputs);
  };

  return (
    <>
      <h1 className="pb-5">Add new event</h1>
      {/* <button onClick={addEvent}>testing btn</button> */}
      <form
        onSubmit={formHandler}
        className="bg-[#e2e8f0] py-5 px-8 rounded-2xl w-125"
      >
        <div className="py-2 flex-col flex">
          <Input
            label="Event name"
            name="name"
            required
            handleFieldInput={handleFieldInput}
          />
        </div>
        <div className="py-2 flex-col flex">
          <Input
            label="Event location"
            name="location"
            handleFieldInput={handleFieldInput}
          />
        </div>
        <div className="py-2 flex-col flex">
          <Input
            label="Event date"
            name="date"
            type="date"
            handleFieldInput={handleFieldInput}
          />
        </div>
        <div className="py-2 flex-col flex mb-5">
          <TextArea
            label="Event description"
            name="description"
            handleFieldInput={handleFieldInput}
          />
        </div>
        <button className="cursor-pointer dark:bg-gray-800 dark:text-white py-2 px-5 rounded">
          Submit
        </button>
      </form>
    </>
  );
};

export default EventForm;
