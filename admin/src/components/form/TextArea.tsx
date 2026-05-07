import { InputType } from "./Input";

const TextArea = ({
  label,
  name,
  required = false,
  handleFieldInput,
  value,
}: InputType) => {
  return (
    <>
      <label htmlFor="">{label}</label>
      <textarea
        name={name}
        id=""
        required={required}
        className="border border-[#94a3b8] rounded"
        onChange={(e) => handleFieldInput(name, e.target.value)}
        value={value}
      ></textarea>
    </>
  );
};

export default TextArea;
