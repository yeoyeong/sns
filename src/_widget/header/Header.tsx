'use client';

import { useAuthActions } from '@/_features/i/model';

export default function Header() {
  const { signOut } = useAuthActions();
  return (
    <div>
      <button type='button' onClick={signOut}>
        로그아웃
      </button>
    </div>
  );
}
