'use client'

import { useForm } from 'react-hook-form';
import InputPhoto from './writeForm.photo';
import { WritingFormData } from '../lib/types/write';
import InputContent from './writeForm.content';
import writeStore from '../lib/store/store';
import useCreatePost from '../model/query/useCreatePost';
import { uploadImg } from '../model/api/uploadImageApi';



export default function WriteForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<WritingFormData>();
  const { picture } = writeStore()
  const { createPostHandler } = useCreatePost()
  
  const uploadImgGetUrl = async (): Promise<string[]> => {
    const uploadPromises = picture.map(async (el: File) => {
      try {
        const result = await uploadImg(el, "post_img");
        if (result === null) return null
        return result;
      } catch (err) {
        console.error(`Error uploading image for element: ${el.name}`, err);
        return null;
      }
  });
    const results = await Promise.all(uploadPromises);
    return results.filter(result => result !== null) as string[]; // null이 아닌 결과만 반환
  };
  

  const onSubmit = async (data:WritingFormData) => {
    const pictures = await uploadImgGetUrl()
    createPostHandler({...data, picture:pictures})
  }



  return (
    <form className='pt-5 flex w-full h-full max-w-[420px] flex-col justify-between px-4' onSubmit={handleSubmit(onSubmit)}>
      <div>
        <InputContent register={register} errors={errors} />
        <InputPhoto />
      </div>
      <input className="mb-4 w-full cursor-pointer py-4 rounded-3xl flex bg-blue-default text-white-100" type='submit' value="완료"/>
    </form>
  );
}