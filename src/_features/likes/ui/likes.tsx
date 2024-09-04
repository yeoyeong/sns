import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import HeartIcon from '@/_shared/asset/icon/heart_icon.svg';
import usePostLike from '../model/query/usePostLike';
import usePostLikeStats from '../model/query/usePostLikeStats';
import { LikePayload } from '../lib/types/likesType';

type Props = {
  post_id: number;
  likesCount: number;
};
export default function Likes({ post_id, likesCount }: Props) {
  const { mutation } = usePostLike();
  const [count, setCount] = useState(likesCount);
  const { data: isLike, isLoading } = usePostLikeStats({ post_id });

  const likeHandler = useDebouncedCallback(async (payload: LikePayload) => {
    if (!payload.post_id) return;
    try {
      const { state } = await mutation.mutateAsync(payload);
      if (!state) setCount(prev => prev - 1);
      else setCount(prev => prev + 1);
    } catch (error) {
      console.log(error);
    }
  }, 300); // 300ms 디바운스 적용

  if (isLoading) {
    return (
      <div>
        <HeartIcon fill='none' stroke='#848484' />
      </div>
    );
  }

  return (
    <div className='group relative'>
      <button
        type='button'
        aria-label='likes_button'
        onClick={() => likeHandler({ post_id })}>
        {!isLike ? (
          <HeartIcon fill='none' stroke='#848484' />
        ) : (
          <HeartIcon fill='#E65272' />
        )}
      </button>
      <div className='bg-black-100 text-white-100 absolute -left-2 bottom-8 hidden rounded-lg px-4 py-2 text-center text-sm group-hover:block'>
        {count}
      </div>
    </div>
  );
}