'use client';

import { useParams } from 'next/navigation';
import PostCard from './post-list.card';
import useGetPostDetail from '../model/query/useGetPostDetail';
import PostCardSkeleton from './post-list.cardSkeleton';

export default function PostDetail() {
  const { postId } = useParams();
  const postIdStr = Array.isArray(postId) ? postId[0] : postId;

  const { data, isSuccess, isLoading } = useGetPostDetail({
    postId: postIdStr,
  });

  if (isLoading) return <PostCardSkeleton />;

  if (isSuccess) {
    return <div className='mt-4'>{data && <PostCard data={data} />}</div>;
  }
}