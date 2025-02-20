interface ReusableInputProps {
  label?: string;
  type: string;
  name?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  min?: number | string;
  readOnly?: boolean | undefined;
}

const Input: React.FC<ReusableInputProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  readOnly,
  min,
  className = "w-full p-3 border bg-white rounded focus:outline-none",
}) => {
  return (
    <div className="mb-3">
      <label className="block mb-1 font-medium text-[#232360]">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={className}
        placeholder={placeholder}
        min={min}
        readOnly={readOnly}
      />
    </div>
  );
};

export default Input;
