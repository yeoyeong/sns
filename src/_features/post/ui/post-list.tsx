'use client';

import { useEffect } from 'react';
import useGetPostData from '../model/query/useGetPostData';
import PostCard from './post-list.card';

export default function PostList() {
  const { data, isSuccess, isLoading, ref } = useGetPostData();
  useEffect(() => {
    console.log(data);
  }, [data]);
  if (isLoading) return <div>로딩중</div>;
  if (isSuccess) {
    return (
      <div className='mt-4'>
        {data.map((el) => (
          <PostCard data={el} />
        ))}
        <div ref={ref} style={{ height: '1px', background: 'red' }} />
      </div>
    );
  }
}