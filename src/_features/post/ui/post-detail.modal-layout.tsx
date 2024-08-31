import BackButton from '@/_shared/ui/button/BackButton';

export default function DetailModalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='bg-white-custom fixed top-0 z-20 flex h-screen w-full justify-center pt-4'>
      <div>
        <div className='bg-white-100 relative flex w-[630px] flex-col rounded-lg shadow-md'>
          <div className='absolute left-4 top-4'>
            <BackButton />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}