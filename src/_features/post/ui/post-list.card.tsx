'use client'

/**
 * id
 * user_id
 * content
 * weather
 * picture
 * created_at
 * 좋아요 갯수 / 여부
 * 댓글 갯수?
 * 댓글 달기
 * */
import HeartIcon  from "@/_shared/asset/icon/heart_icon.svg"
import message_icon from "@/_shared/asset/icon/message_icon.png"
import Image from 'next/image';
import { GetPostType } from '../lib/type/getPostType';
import ImageSlider from './post-list.imageSlider';
import PostListContent from "./post-list.content";
import PostListDate from "./post-list.date";
import PostListComments from "./post-list.comments";

type Props = {
  data:GetPostType
}
export default function PostCard({data}:Props) {
  const {content, weather, picture, created_at:createdAt} = data

  return (
    <div className='mt-6'>
      <div className='w-[360px] grid card-grid border border-solid border-blue-300 items-center'>
        <p className='flex items-center justify-center h-9 border-r border-solid border-blue-300'>날짜</p>
        
        <PostListDate createdAt={createdAt} />
        <p className='flex items-center justify-center h-9 border-l border-r border-solid border-blue-300'>날씨</p>
        <p className='text-center'>{weather}</p>
      </div>
      <ImageSlider slideImages={picture}/>
      <PostListContent content={content} />
      <div className='flex gap-1 mt-4'>
        <div>
          <HeartIcon fill="none" stroke="#848484"/>
          {/* <HeartIcon fill="red"/> */}
        </div>
        <div>
          <Image src={message_icon} alt="채팅 아이콘" height={24} />
        </div>
      </div>
      <PostListComments post_id={data.id} commentsCount={data.commentsCount}/>
    </div>
  );
}
