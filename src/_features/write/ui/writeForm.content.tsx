export default function InputContent() {
  return (
    <div className='mb-4 flex flex-col gap-3'>
      <textarea className='h-36 resize-none rounded-2xl border border-solid border-gray-300 px-2 py-2' />
      <div className='flex items-center gap-3 border border-solid border-gray-300'>
        <p>날씨</p>
        <input
          type='text'
          className='w-20 rounded-2xl border border-solid border-gray-300 py-4 text-center'
          placeholder=''
        />
      </div>
    </div>
  );
}