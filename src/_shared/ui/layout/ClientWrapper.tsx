'use client';

import { UserData } from '@/_features/i/lib/types/user';
import { useUserStore } from '@/_shared/util/userStore';
import { useEffect } from 'react';

interface ClientWrapperProps {
  user: UserData | null;
  children: React.ReactNode;
}

function ClientWrapper({ user, children }: ClientWrapperProps) {
  const { setUser } = useUserStore();

  useEffect(() => {
    if (!user) return;
    setUser(user);
  }, [user, setUser]);

  return <div>{children}</div>;
}

export default ClientWrapper;