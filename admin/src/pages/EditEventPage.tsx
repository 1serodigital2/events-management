// react hooks
import { useState } from "react";

// reactRouter
import { useParams, useLoaderData } from "react-router-dom";

// firebase
import { useMutation } from "@tanstack/react-query";

import { queryClient, updateEventDetail } from "../api/events";

// types
import { FormType } from "../types/event";

// api
import { getEventDetail } from "../api/events";

// components
import Alert, { AlertProps } from "../components/ui/alert";
import EventForm from "../components/form/EventForm";

const EditEvent = () => {
  const params = useParams();
  const id = params.id;

  const data = useLoaderData();

  console.log("useLoaderData", data);

  const initFormData: FormType = {
    name: data?.name || "",
    location: data?.location || "",
    date: data?.date || "",
    description: data?.description || "",
  };

  const [formInputs, setFormInputs] = useState<FormType>(initFormData);
  const [formSubmitResponse, setFormSubmitResponse] = useState<AlertProps>({
    message: "",
  });
  const { mutate, isPending } = useMutation({
    mutationFn: updateEventDetail,
    mutationKey: ["events", id],
    onSuccess: () => {
      setFormInputs(initFormData);

      setFormSubmitResponse({
        type: "success",
        message: "Event udpated successfully",
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
        message: "Failed to udpate event",
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

      console.log("update event detail for " + id, eventDetail);
      mutate({ id, values: eventDetail });
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
      <h1 className="pb-5">Edit event</h1>
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

export default EditEvent;
