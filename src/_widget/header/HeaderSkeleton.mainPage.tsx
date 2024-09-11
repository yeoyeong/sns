import Link from 'next/link';
import message_icon from '@/_shared/asset/icon/message_icon.png';
import logo from '@/_shared/asset/logo/logo.png';
import Image from 'next/image';

export default function HeaderSkeletonMain() {
  return (
    <div className='flex w-[430px] flex-col items-center justify-center gap-4 border-b border-solid border-gray-200 py-10'>
      <div>
        <Link href='/'>
          <Image
            src={logo}
            alt='사이트 로고'
            width={126}
            height={29}
            loading='eager'
          />
        </Link>
      </div>
      <nav className='flex w-full items-center justify-end'>
        <ul className='flex gap-3'>
          <li>
            <Link href='/chat' className='relative'>
              <Image src={message_icon} alt='메세지 아이콘' loading='eager' />
            </Link>
          </li>
          <li>
            <div className='skeleton block h-[27px] w-[27px] overflow-hidden rounded-full text-transparent'>
              로고
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}