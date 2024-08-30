import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { WritingFormData } from '../lib/types/write';

interface Props {
  register: UseFormRegister<WritingFormData>;
  errors: FieldErrors<WritingFormData>;
}

export default function InputContent({ register, errors }: Props) {
  return (
    <div className='mb-4 flex flex-col gap-3'>
      <div className='flex'>
        <div className='flex items-center border border-solid border-gray-300'>
          <p className='px-5 text-center'>날씨</p>
          <input
            type='text'
            className='w-32 border-l border-solid border-gray-300 py-4 text-center'
            {...register('weather')}
          />
          {errors.weather && (
            <p className='text-red-500'>{errors.weather.message}</p>
          )}
        </div>
      </div>
      <textarea
        className='h-36 resize-none rounded-2xl border border-solid border-gray-300 px-2 py-2'
        placeholder='오늘 어떤 일이 있으셨나요?'
        {...register('content')}
      />
      {errors.content && (
        <p className='text-red-500'>{errors.content.message}</p>
      )}
    </div>
  );
}