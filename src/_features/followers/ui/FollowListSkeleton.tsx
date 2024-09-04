export default function FollowListSkeleton() {
  return (
    <div className='bg-white-100 fixed left-1/2 top-1/2 z-20 flex h-[600px] w-[420px] -translate-x-1/2 -translate-y-1/2 flex-col shadow-md'>
      <div className='pl-2 pt-4'>
        <div className='skeleton h-[24px] w-[24px] rounded-md text-transparent'>
          버튼
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <div className='flex justify-between px-11'>
          <div className='flex items-center gap-1'>
            <div className='skeleton h-[32px] w-[32px] overflow-hidden rounded-full text-transparent' />
            <p className='skeleton rounded-md text-lg font-bold text-transparent'>
              유저 닉네임
            </p>
          </div>
          <div className='skeleton rounded-lg px-2 text-transparent'>
            팔로우
          </div>
        </div>
        <div className='flex justify-between px-11'>
          <div className='flex items-center gap-1'>
            <div className='skeleton h-[32px] w-[32px] overflow-hidden rounded-full text-transparent' />
            <p className='skeleton rounded-md text-lg font-bold text-transparent'>
              유저 닉네임
            </p>
          </div>
          <div className='skeleton rounded-lg px-2 text-transparent'>
            팔로우
          </div>
        </div>
        <div className='flex justify-between px-11'>
          <div className='flex items-center gap-1'>
            <div className='skeleton h-[32px] w-[32px] overflow-hidden rounded-full text-transparent' />
            <p className='skeleton rounded-md text-lg font-bold text-transparent'>
              유저 닉네임
            </p>
          </div>
          <div className='skeleton rounded-lg px-2 text-transparent'>
            팔로우
          </div>
        </div>
        <div className='flex justify-between px-11'>
          <div className='flex items-center gap-1'>
            <div className='skeleton h-[32px] w-[32px] overflow-hidden rounded-full text-transparent' />
            <p className='skeleton rounded-md text-lg font-bold text-transparent'>
              유저 닉네임
            </p>
          </div>
          <div className='skeleton rounded-lg px-2 text-transparent'>
            팔로우
          </div>
        </div>
      </div>
    </div>
  );
}
