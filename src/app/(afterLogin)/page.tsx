import { PostList } from '@/_features/post';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-center'>
      <Link href='/post/write'>글쓰기 페이지 이동 링크</Link>
      <PostList />
    </main>
  );
}
