'use client';

import { useAuthStore } from '@/_shared/util/store';
import { usePathname } from 'next/navigation';
import HeaderMain from './Header.mainPage';
import HeaderUser from './Header.userPage';

export default function Header() {
  const { user } = useAuthStore();
  const pathname = usePathname().replace(/\//g, ''); // "/"를 제거합니다.
  const isUserPage =
    user?.user_metadata?.displayName?.toLowerCase() === pathname.toLowerCase();
  //

  return (
    <header className='flex justify-center'>
      {isUserPage && user ? (
        <HeaderUser displayName={user.user_metadata?.displayName} />
      ) : (
        <HeaderMain displayName={user?.user_metadata?.displayName} />
      )}
    </header>
  );
}