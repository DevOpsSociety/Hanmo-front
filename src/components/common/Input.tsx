import { ReactNode } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";

type InputProps<T extends FieldValues> = {
  label?: ReactNode;
  register: UseFormRegister<T>;
  registerName: Path<T>;
  placeholder?: string;
  errorMessage?: string;
  disabled?: boolean;
  type?: string;
};

export default function Input<T extends FieldValues>({
  label = "",
  register,
  registerName,
  placeholder,
  errorMessage,
  disabled = false,
  type ="text"
}: InputProps<T>) {
  return (
    <div className="text-[15px] text-black text-opacity-70">
      <label>{label}</label>
      <input
        type={type}
        {...register(registerName)}
        placeholder={placeholder}
        className={`border-[1.5px] border-solid border-[rgba(0,0,0,0.5)] rounded-[10px] w-full h-11 px-3 ${
          disabled && "bg-gray-200"
        }`}
        disabled={disabled}
      />
      <ErrorMessage message={errorMessage} />
    </div>
  );
}
