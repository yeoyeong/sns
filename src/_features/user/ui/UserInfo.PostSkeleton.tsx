export default function UserInfoPostSkeleton() {
  return (
    <div className='mx-auto mt-10 grid w-1/2 gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
      <div className='skeleton group relative aspect-square rounded-md text-transparent' />
      <div className='skeleton group relative aspect-square rounded-md text-transparent' />
      <div className='skeleton group relative aspect-square rounded-md text-transparent' />
    </div>
  );
}