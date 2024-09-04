'use client';

import { useUserStore } from '@/_shared/util/userStore';
import HeaderMain from './Header.mainPage';

export default function Header() {
  const { user } = useUserStore();

  if (!user) return null;

  return (
    <header className='flex justify-center'>
      <HeaderMain user={user} />
    </header>
  );
}