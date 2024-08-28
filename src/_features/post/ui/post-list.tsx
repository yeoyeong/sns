'use client';

import useGetPostData from '../model/query/useGetPostData';
import PostCard from './post-list.card';

export default function PostList() {
  const { data, isSuccess, isLoading, ref } = useGetPostData();

  if (isLoading) return <div>로딩중</div>;
  if (isSuccess) {
    return (
      <div className='mt-4'>
        {data.map((el) => (
          <PostCard data={el} key={el?.id} />
        ))}
        <div ref={ref} className='h-[1px]' />
      </div>
    );
  }
}