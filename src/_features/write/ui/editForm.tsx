'use client'

import { useForm } from 'react-hook-form';
import useGetPostDetail from '@/_features/post/model/query/useGetPostDetail';
import { useParams } from 'next/navigation';
import InputContent from './writeForm.content';
import InputPhoto from './writeForm.photo';
import useUpload from '../lib/hooks/useUpload';
import { WritingFormData } from '../lib/types/write';
import writeStore from '../lib/store/store';
import usePatchPost from '../model/query/usePatchPost';


export default function EditForm() {
    const { postId } = useParams();
    const postIdStr = Array.isArray(postId) ? postId[0] : postId;
    const { picture } = writeStore()
    const { patchPostHandler:postHandler } = usePatchPost({postId:postIdStr})
    const {data:postData, isLoading} = useGetPostDetail({postId:postIdStr})

    const {
      register,
      formState: { errors },
      handleSubmit,
    } = useForm<WritingFormData>();

    // TODO: PATCH핸들러만들기

    const { onSubmit } = useUpload();

    if(isLoading) {
      return <div>로딩중. . .</div>
    }

    
    

  
    

  return (
    <form
      className='flex h-full w-full max-w-[420px] flex-col justify-between px-4 pt-5'
      onSubmit={handleSubmit(data =>
        onSubmit({ data, postHandler, picture })
      )}
      >
      {postData && <div>
        <InputContent register={register} errors={errors} content={postData.content} weather={postData.weather}/>
        <InputPhoto picture={postData.picture}/>
      </div>}
      <input
        className='bg-blue-default text-white-100 mb-4 flex w-full cursor-pointer rounded-3xl py-4'
        type='submit'
        value='완료'
      />
    </form>
  );
}