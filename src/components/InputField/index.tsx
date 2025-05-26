import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface InputFieldProps<T extends FieldValues> {
  type?: string;
  placeholder: string;
  disabled?: boolean;
  errorMessage?: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  className?: string;
}

export default function InputField<T extends FieldValues>({
  type = "text",
  placeholder,
  disabled,
  errorMessage,
  register,
  name,
  className = "",
}: InputFieldProps<T>) {
  return (
    <div>
      <input
        type={type}
        {...register(name)}
        placeholder={placeholder}
        className={
          className ||
          "w-full border-0 border-b border-gray-300 bg-transparent text-[17px] placeholder:text-gray-400 focus:outline-none focus:border-[#3B5B7A] py-3"
        }
        disabled={disabled}
      />
      {errorMessage && (
        <p className="text-xs text-red-500 mt-1">{errorMessage}</p>
      )}
    </div>
  );
}