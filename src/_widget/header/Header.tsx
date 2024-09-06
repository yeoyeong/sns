'use client';

import { usePathname } from 'next/navigation';
import { useUserStore } from '@/_shared/util/userStore';
import HeaderMain from './Header.mainPage';

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

  if (pathname.startsWith('chat'))
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