// react hooks
import { useState } from "react";

// firebase
import { useMutation } from "@tanstack/react-query";

import { createEvent, queryClient } from "../api/events";

// utils
import Input from "../components/form/Input";
import TextArea from "../components/form/TextArea";

// types
import { FormType } from "../types/event";
import { log } from "firebase/firestore/lite/pipelines";

// components
import Alert, { AlertProps } from "../components/ui/alert";

const initFormData: FormType = {
  name: "",
  location: "",
  date: "",
  description: "",
};

const EventForm = () => {
  const [formInputs, setFormInputs] = useState<FormType>(initFormData);
  const [formSubmitResponse, setFormSubmitResponse] = useState<AlertProps>({
    type: "",
    message: "",
  });
  const { mutate, isPending } = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      setFormInputs(initFormData);

      setFormSubmitResponse({
        type: "success",
        message: "Event added successfully",
      });

      queryClient.invalidateQueries({
        queryKey: ["events"],
        refetchType: "none",
      });

      setTimeout(() => {
        setFormSubmitResponse("");
      }, 3000);
    },
    onError: () => {
      setFormSubmitResponse({
        type: "error",
        message: "Failed to add event",
      });
      setTimeout(() => {
        setFormSubmitResponse("");
      }, 3000);
    },
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
      {formSubmitResponse && formSubmitResponse.message !== "" && (
        <Alert
          type={formSubmitResponse.type}
          message={formSubmitResponse.message}
        />
      )}
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
            value={formInputs?.name || ""}
          />
        </div>
        <div className="py-2 flex-col flex">
          <Input
            label="Event location"
            name="location"
            handleFieldInput={handleFieldInput}
            value={formInputs?.location || ""}
          />
        </div>
        <div className="py-2 flex-col flex">
          <Input
            label="Event date"
            name="date"
            type="date"
            handleFieldInput={handleFieldInput}
            value={formInputs?.date || ""}
          />
        </div>
        <div className="py-2 flex-col flex mb-5">
          <TextArea
            label="Event description"
            name="description"
            handleFieldInput={handleFieldInput}
            value={formInputs?.description || ""}
          />
        </div>
        <button
          className={`${isPending ? "bg-gray-400" : "dark:bg-gray-800 cursor-pointer"} dark:text-white py-2 px-5 rounded`}
          disabled={isPending}
        >
          {isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </>
  );
};

export default EventForm;
