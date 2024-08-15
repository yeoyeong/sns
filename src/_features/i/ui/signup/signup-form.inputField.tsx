import { FieldError, UseFormRegister } from 'react-hook-form';

type Props = {
  label?: string;
  type?: string;
  register: UseFormRegister<any>;
  name: string;
  validation?: object;
  placeholder?: string;
  error?: FieldError;
};

export default function InputField({
  type = 'text',
  register,
  name,
  validation,
  placeholder,
  error,
}: Props) {
  return (
    <div className='mb-4'>
      {/* eslint-disable react/jsx-props-no-spreading */}
      <input
        className={`rounded-3xl border bg-transparent py-3 pl-6 ${
          error
            ? 'border-error-100 placeholder-error-100'
            : 'border-gray-300 placeholder-gray-300'
        } w-full font-bold`}
        type={type}
        {...register(name, validation)}
        placeholder={placeholder}
      />
      {error && <p className='ml-3 text-xs text-red-500'>{error.message}</p>}
    </div>
  );
}