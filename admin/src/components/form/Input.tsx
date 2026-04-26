export interface InputType {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}

const Input = ({ label, name, type = "text", required = false }: InputType) => {
  return (
    <>
      <label htmlFor="">{label}</label>
      <input
        name={name}
        type={type}
        className="border border-[#94a3b8] rounded"
        required={required}
      />
    </>
  );
};

export default Input;
