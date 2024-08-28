'use client';

import { UserData } from '@/_features/i/lib/types/user';
import { usePathname } from 'next/navigation';
import HeaderMain from './Header.mainPage';
import { useUserStore } from '@/_shared/util/userStore';

export default function Header() {
  const pathname = usePathname().replace(/\//g, ''); // "/"를 제거합니다.
  const { user } = useUserStore();

  if (!user) return null;

  if (pathname === 'postwrite')
    return (
      <header className='flex justify-center'>
        <HeaderMain user={user} />
      </header>
    );

  if (pathname !== '') return null;

  return (
    <header className='flex justify-center'>
      <HeaderMain user={user} />
    </header>
  );
}