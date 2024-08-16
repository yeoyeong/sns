import Link from 'next/link';

export default function Home() {
  return (
    <main>
      메인페이지
      <Link href='/i/login'>로그인</Link>
    </main>
  );
}
