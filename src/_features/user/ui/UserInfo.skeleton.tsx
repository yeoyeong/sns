'use client';

export default function UserInfoSkeleton() {
  return (
    <div>
      <div className='flex justify-center gap-10 pt-16'>
        <div className='flex flex-col items-center gap-4'>
          <div className='skeleton h-[192px] w-[192px] overflow-hidden rounded-full text-transparent' />
        </div>
        <div className='flex flex-col gap-8'>
          <div className='flex items-start gap-4'>
            <div>
              <p className='skeleton rounded-md text-3xl font-bold leading-none text-transparent'>
                유저 닉네임
              </p>
              <p className='skeleton mt-1 rounded-md text-sm leading-none text-transparent'>
                유저 아이디
              </p>
            </div>
            <div>
              <div className='relative'>
                <button
                  className='skeleton flex h-[32px] w-[32px] items-center rounded-md text-transparent'
                  type='button'>
                  버튼
                </button>
              </div>
            </div>
          </div>
          <ul className='flex gap-5'>
            <li>
              <p>
                <span className='skeleton mr-1 rounded-md font-bold text-transparent'>
                  게시물 0
                </span>
              </p>
            </li>
            <li>
              <p>
                <span className='skeleton mr-1 rounded-md font-bold text-transparent'>
                  게시물 0
                </span>
              </p>
            </li>
            <li>
              <p>
                <span className='skeleton mr-1 rounded-md font-bold text-transparent'>
                  게시물 0
                </span>
              </p>
            </li>
          </ul>
          <p className='skeleton h-4 rounded-md' />
        </div>
      </div>
    </div>
  );
}