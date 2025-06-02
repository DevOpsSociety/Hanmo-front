import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

type OptionProps<T extends FieldValues> = {
  label?: string;
  register: UseFormRegister<T>;
  registerName: Path<T>;
  enumOptions: object | Record<string, { id: number; name: string; }>;
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
    <div className="w-full flex flex-col">
      {/* label은 placeholder처럼 사용 */}
      <select
        className="w-full border-0 border-b border-gray-300 bg-transparent text-[17px] placeholder:text-gray-400 focus:outline-none focus:border-[#3B5B7A] px-2 py-3 appearance-none text-[#134D80]"
        {...register(registerName)}
        defaultValue=""
      >
        <option value="" disabled hidden>
          {label || "선택"}
        </option>
        {Array.isArray(enumOptions) &&
          enumOptions.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label || opt.name}
            </option>
          ))}
      </select>
      {errorMessage && (
        <p className="text-xs text-red-500 mt-1">{errorMessage}</p>
      )}
    </div>
  );
}