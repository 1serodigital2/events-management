import { InputType } from "./Input";

const TextArea = ({ label, name, required = false }: InputType) => {
  return (
    <>
      <label htmlFor="">{label}</label>
      <textarea
        name={name}
        id=""
        required={required}
        className="border border-[#94a3b8] rounded"
      ></textarea>
    </>
  );
};

export default TextArea;
