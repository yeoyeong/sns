'use client';

import { UserData } from '@/_features/i/lib/types/user';
import { usePathname } from 'next/navigation';
import HeaderMain from './Header.mainPage';

type Props = {
  user: UserData | null;
};

export default function Header({ user }: Props) {
  const pathname = usePathname().replace(/\//g, ''); // "/"를 제거합니다.

  console.log();
  if (!user || pathname !== '') return null;

  return (
    <header className='flex justify-center'>
      <HeaderMain user={user} />
    </header>
  );
}