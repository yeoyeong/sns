'use client';

import React, { ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation'; // Next.js의 useRouter 훅 사용
import { useAuthStore } from './store';

export default function ZustandProvider({ children }: { children: ReactNode }) {
  const { user, signIn, isLoading } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname(); // 현재 경로를 가져오는 usePathname 훅 사용

  useEffect(() => {
    signIn(); // 초기 로그인 상태 확인
  }, [signIn]);

  useEffect(() => {
    // TODO: 랜더링 최적화 필요
    const restrictedPaths = ['/login', '/signup'];

    if (!isLoading && user) {
      // 로그인된 상태일 때 특정 경로로 접근을 시도하면 메인 페이지로 리디렉션
      if (restrictedPaths.includes(pathname)) {
        router.replace('/');
      }
    }

    if (!isLoading && !user) {
      if (!restrictedPaths.includes(pathname)) {
        router.replace('/login');
      }
    }
  }, [isLoading, user, router, pathname]);

  if (isLoading) {
    return <div>Loading...</div>; // 로딩 중일 때 보여줄 UI
  }

  return <div>{children}</div>;
}