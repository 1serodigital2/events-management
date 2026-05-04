// firebase
import { useMutation } from "@tanstack/react-query";

import { createEvent } from "../api/events";

// utils
import Input from "../components/form/Input";
import TextArea from "../components/form/TextArea";

// interface formDataType {
//   data: object;
// }
const EventForm = () => {
  const { mutate } = useMutation({
    mutationFn: createEvent,
  });

  const formHandler = async (event: React.SubmitEvent) => {
    event.preventDefault();
    try {
      const form = event.target as HTMLFormElement;
      const formData = new FormData(form);

      const name = formData.get("event-name")?.toString() || "";
      const location = formData.get("location")?.toString() || "";
      const date = formData.get("date"?.toString() || "")?.toString() || "";
      const description = formData.get("description")?.toString() || "";

      const eventDetail = {
        name,
        location,
        date,
        description,
      };

      mutate(eventDetail);
    } catch (error) {}
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
          <Input label="Event name" name="event-name" required />
        </div>
        <div className="py-2 flex-col flex">
          <Input label="Event location" name="location" />
        </div>
        <div className="py-2 flex-col flex">
          <Input label="Event date" name="date" type="date" />
        </div>
        <div className="py-2 flex-col flex mb-5">
          <TextArea label="Event description" name="description" />
        </div>
        <button className="cursor-pointer dark:bg-gray-800 dark:text-white py-2 px-5 rounded">
          Submit
        </button>
      </form>
    </>
  );
};

export default EventForm;
