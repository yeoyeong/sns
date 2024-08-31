'use client';

import { DetailHeader } from '@/_widget';
import { useParams } from 'next/navigation';
import PostCard from './post-list.card';
import useGetPostDetail from '../model/query/useGetPostDetail';

export default function PostDetail() {
  const { postId } = useParams();
  const postIdStr = Array.isArray(postId) ? postId[0] : postId;

  const { data, isSuccess, isLoading } = useGetPostDetail({
    postId: postIdStr,
  });

  if (isLoading) return <div>로딩중</div>;
  if (isSuccess) {
    return (
      <div className='mt-4'>
        {/* <DetailHeader title='게시글' /> */}
        {data && <PostCard data={data} />}
      </div>
    );
  }
}