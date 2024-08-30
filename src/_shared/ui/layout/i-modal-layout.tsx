import note_img from '@/_shared/asset/bg/note.png';
import logo from '@/_shared/asset/logo/logo.png';
import Image from 'next/image';
import BackButton from '../button/BackButton';

export default function ImodalLayout({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose?: () => void;
}) {
  return (
    <div className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform'>
      <div
        className='flex h-[568px] w-[427px] flex-col items-center bg-cover bg-center bg-no-repeat pt-4'
        style={{
          backgroundImage: `url(${note_img.src})`,
        }}>
        <div className='flex w-full flex-col items-center justify-center'>
          <BackButton onClose={onClose} />
          <Image src={logo} height={29} width={126} alt='yeoyeong' />
        </div>
        {children}
      </div>
    </div>
  );
}