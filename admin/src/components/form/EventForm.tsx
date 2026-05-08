import { FormType } from "../../types/event";
import Input from "./Input";
import TextArea from "./TextArea";

interface EventFormProps {
  formHandler: (event: React.SubmitEvent) => void;
  handleFieldInput: (name: string, value: string) => void;
  formInputs: FormType;
  isPending: boolean;
}

const EventForm = ({
  formHandler,
  handleFieldInput,
  formInputs,
  isPending,
}: EventFormProps) => {
  return (
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
  );
};

export default EventForm;
