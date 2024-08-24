import BackButton from '../button/BackButton';

export default function ModalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <div className='fixed left-0 top-0 flex h-screen w-full items-center justify-center bg-gray-900 bg-opacity-80'>
    <div className='bg-white-100 fixed left-1/2 top-1/2 flex h-[800px] w-[420px] -translate-x-1/2 -translate-y-1/2 transform flex-col shadow-md'>
      <div className='pl-2 pt-4'>
        <BackButton />
      </div>
      {children}
    </div>
  );
}