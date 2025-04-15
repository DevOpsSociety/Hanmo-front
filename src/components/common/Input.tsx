import { ReactNode } from 'react';
import ErrorMessage from '../ErrorMessage';
import { UseFormRegister, FieldValues, Path } from 'react-hook-form';

type InputProps<T extends FieldValues> = {
  label?: ReactNode;
  register: UseFormRegister<T>;
  registerName: Path<T>;
  placeholder?: string;
  errorMessage?: string;
};

export default function Input<T extends FieldValues>({
  label = '',
  register,
  registerName,
  placeholder,
  errorMessage,
}: InputProps<T>) {
  return (
    <div className='text-[15px] text-black text-opacity-70'>
      <label>{label}</label>
      <input
        type='text'
        {...register(registerName)}
        placeholder={placeholder}
        className='border-[1.5px] border-solid border-[rgba(0,0,0,0.5)] rounded-[10px] w-full h-11 px-3'
      />
      <ErrorMessage message={errorMessage} />
    </div>
  );
}
