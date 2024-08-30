import { PostList } from '@/_features/post';
import Link from 'next/link';
import Image from 'next/image';
import write_icon from '@/_shared/asset/icon/write_icon.png';

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center'>
      <Link
        href='/post/write'
        className='fixed bottom-5 left-[64%] z-40 flex items-center justify-center rounded-xl px-2 shadow-md'>
        <Image src={write_icon} width={38} alt='글쓰기 아이콘' />
      </Link>
      <PostList />
    </div>
  );
}