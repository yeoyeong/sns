export default function EditFormSkeleton() {
  return (
    <div className='flex h-full w-full max-w-[420px] flex-col justify-between px-4 pt-5'>
      <div>
        {/* <InputContent
          register={register}
          errors={errors}
          content={postData.content}
          weather={postData.weather}
        /> */}
        <div className='mb-4 flex flex-col gap-3'>
          <div className='flex'>
            <div className='flex items-center gap-2'>
              <p className='skeleton rounded-md px-5 py-4 text-center text-transparent'>
                날씨
              </p>
              <div className='skeleton w-32 rounded-md py-4 text-center text-transparent'>
                맑음
              </div>
            </div>
          </div>
          <div className='skeleton h-36 resize-none rounded-2xl px-2 py-2 text-transparent' />
        </div>

        <div className='flex items-center gap-3'>
          <div className='skeleton flex aspect-square w-14 items-center justify-center rounded-2xl text-transparent'>
            <p className='skeleton rounded-md text-center text-xs text-transparent'>
              2/5
            </p>
          </div>
        </div>
      </div>
      <input
        className='bg-blue-default text-white-100 skeleton mb-4 mt-4 flex w-full cursor-pointer rounded-3xl py-4 text-transparent'
        type='submit'
        value='완료'
      />
    </div>
  );
}