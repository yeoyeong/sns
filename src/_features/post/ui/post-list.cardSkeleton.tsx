'use client';

import PostListCommentsSkeleton from './post-list.commentsSkeleton';
import PostListItemSkeleton from './post-list.itemSkeleton';

export default function PostCardSkeleton() {
  return (
    <div className='flex justify-center'>
      <div className='mt-6 w-[430px] border-b border-solid border-gray-200 pb-6'>
        <div className='flex justify-between'>
          <div className='flex items-center gap-1 py-2'>
            <div className='skeleton block h-[27px] w-[27px] overflow-hidden rounded-full text-transparent' />
            <p className='skeleton rounded-md text-lg font-bold text-transparent'>
              유저 닉네임
            </p>
          </div>
          <div className='flex items-center'>
            <div className='relative'>
              <button
                className='skeleton flex h-[32px] items-center rounded-md text-transparent'
                type='button'>
                버튼
              </button>
            </div>
          </div>
        </div>
        <PostListItemSkeleton />
        <div className='mt-4 flex gap-1'>
          <div className='skeleton rounded-md text-transparent'>아이콘</div>
          <div className='skeleton rounded-md text-transparent'>아이콘</div>
        </div>
        <PostListCommentsSkeleton />
      </div>
    </div>
  );
}