import note_img from '@/_shared/asset/bg/note.png';
import logo from '@/_shared/asset/logo/logo.png';
import Image from 'next/image';

export default function ImodalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <div
        className='flex h-[568px] w-[427px] flex-col items-center bg-cover bg-center bg-no-repeat pt-11'
        style={{
          backgroundImage: `url(${note_img.src})`,
        }}>
        <Image src={logo} height={29} width={126} alt='yeoyeong' />
        {children}
      </div>
    </div>
  );
}