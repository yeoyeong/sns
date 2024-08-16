import note_img from '@/_shared/asset/bg/note.png';
import logo from '@/_shared/asset/logo/logo.png';
import Image from 'next/image';
import BackButton from './i-modal-layout.Button';

export default function ImodalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <div className='fixed left-0 top-0 flex h-screen w-full items-center justify-center bg-gray-900 bg-opacity-80'>
    <div className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform'>
      <div
        className='flex h-[568px] w-[427px] flex-col items-center bg-cover bg-center bg-no-repeat pt-4'
        style={{
          backgroundImage: `url(${note_img.src})`,
        }}>
        <div className='flex w-full flex-col items-center justify-center'>
          <BackButton />
          <Image src={logo} height={29} width={126} alt='yeoyeong' />
        </div>
        {children}
      </div>
    </div>
  );
}