'use client'

import { useForm } from 'react-hook-form';
import InputPhoto from './writeForm.photo';
import { WritingFormData } from '../lib/types/write';
import InputContent from './writeForm.content';
import writeStore from '../lib/store/store';
import useCreatePost from '../model/query/useCreatePost';
import useUpload from '../lib/hooks/useUpload';


export default function WriteForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<WritingFormData>();
  const { picture } = writeStore()
  const { createPostHandler:postHandler } = useCreatePost()
  const {onSubmit} = useUpload()

  return (
    <form className='pt-5 flex w-full h-full max-w-[420px] flex-col justify-between px-4' onSubmit={handleSubmit((data)=>onSubmit({data, postHandler, picture}))}>
      <div>
        <InputContent register={register} errors={errors} />
        <InputPhoto />
      </div>
      <input className="mb-4 w-full cursor-pointer py-4 rounded-3xl flex bg-blue-default text-white-100" type='submit' value="완료"/>
    </form>
  );
}