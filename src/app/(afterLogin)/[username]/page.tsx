'use client';

import { useAuthStore } from '@/_shared/util/store';

export default function AccountsEditPage() {
  const { user } = useAuthStore();
  console.log(user);
  return <div>유저 페이지</div>;
}
