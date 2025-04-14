import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import ErrorMessage from '../ErrorMessage';

type OptionProps<T extends FieldValues> = {
  label?: string;
  register: UseFormRegister<T>;
  registerName: Path<T>;
  //   enumOptions: Record<string, string | number> | object[];
  enumOptions: object | Record<string, { id: number; name: string }>;
  errorMessage?: string;
};

export default function Option<T extends FieldValues>({
  label,
  register,
  registerName,
  enumOptions,
  errorMessage,
}: OptionProps<T>) {
  return (
    <div className='w-full flex flex-col'>
      <label>{label}</label>
      <select
        className='border-[1.5px] border-solid border-[rgba(0,0,0,0.5)] rounded-[10px] w-full h-11 px-3'
        {...register(registerName)}
      >
        <option value=''>선택</option>
        {Array.isArray(enumOptions) &&
          enumOptions.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
      </select>
      <ErrorMessage message={errorMessage} />
    </div>
  );
}
