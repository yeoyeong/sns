

export default function PostListCommentsSkeleton() {
  return (
    <div className='mt-2 flex w-[360px] flex-col items-start gap-1'>
      <div className='skeleton rounded-md text-gray-400 text-transparent'>
        댓글 0개 모두 보기
      </div>
      <div className='skeleton mt-1 rounded-md pl-2 text-transparent'>
        댓글 달기 ...
      </div>
    </div>
  );
}