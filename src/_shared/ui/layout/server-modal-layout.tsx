import BackButton from '../button/BackButton';

export default function ModalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <div className='fixed left-0 top-0 flex h-screen w-full items-center justify-center bg-gray-900 bg-opacity-80'>
    <div className='bg-white-custom fixed top-0 flex h-screen w-full justify-center pt-20'>
      <div className='bg-white-100 flex h-[600px] w-[420px] flex-col shadow-md'>
        <div className='pl-2 pt-4'>
          <BackButton />
        </div>
        {children}
      </div>
    </div>
  );
}