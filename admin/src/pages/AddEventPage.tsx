// react hooks
import { useState } from "react";

// firebase
import { useMutation } from "@tanstack/react-query";

import { createEvent, queryClient } from "../api/events";

// types
import { FormType } from "../types/event";
import { log } from "firebase/firestore/lite/pipelines";

// components
import Alert, { AlertProps } from "../components/ui/alert";
import EventForm from "../components/form/EventForm";

const initFormData: FormType = {
  name: "",
  location: "",
  date: "",
  description: "",
};

const AddEvent = () => {
  const [formInputs, setFormInputs] = useState<FormType>(initFormData);
  const [formSubmitResponse, setFormSubmitResponse] = useState<AlertProps>({
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
        setFormSubmitResponse({ message: "" });
      }, 3000);
    },
    onError: () => {
      setFormSubmitResponse({
        type: "error",
        message: "Failed to add event",
      });
      setTimeout(() => {
        setFormSubmitResponse({ message: "" });
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
      <EventForm
        formHandler={formHandler}
        handleFieldInput={handleFieldInput}
        formInputs={formInputs}
        isPending={isPending}
      />
    </>
  );
};

export default AddEvent;
