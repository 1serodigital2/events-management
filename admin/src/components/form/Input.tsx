export interface InputType {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  handleFieldInput: (name: string, value: string) => void;
  value: string;
}

const Input = ({
  label,
  name,
  type = "text",
  required = false,
  handleFieldInput,
  value,
}: InputType) => {
  return (
    <>
      <label htmlFor="">{label}</label>
      <input
        name={name}
        type={type}
        className="border border-[#94a3b8] rounded"
        required={required}
        onChange={(e) => handleFieldInput(name, e.target.value)}
        value={value}
      />
    </>
  );
};

export default Input;
