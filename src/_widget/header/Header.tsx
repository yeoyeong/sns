'use client';

import { useAuthStore } from '@/_shared/util/store';
import Link from 'next/link';

// import { useAuthActions } from '@/_features/i/model';
// import Link from 'next/link';
// import { useState } from 'react';

export default function Header() {
  const { user, signOut } = useAuthStore();

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const { signOut } = useAuthActions();
  // useEffect(() => {
  //   // 로그인 상태 확인
  //   const checkUserLoggedIn = async () => {
  //     const { data: user, error } = await supabase.auth.getUser();
  //     if (user) {
  //       setIsLoggedIn(true);
  //     } else {
  //       setIsLoggedIn(false);
  //     }
  //   };

  //   checkUserLoggedIn();

  //   // 로그인 상태 변경을 감지하기 위한 리스너 설정
  //   const { data: authListener } = supabase.auth.onAuthStateChange(
  //     (event, session) => {
  //       if (event === 'SIGNED_IN') {
  //         console.log(event);
  //         console.log(session);
  //         setIsLoggedIn(true);
  //       } else if (event === 'SIGNED_OUT') {
  //         setIsLoggedIn(false);
  //       }
  //     }
  //   );

  //   // return () => {
  //   //   authListener?.unsubscribe();
  //   // };
  // }, []);
  return (
    <div>
      <ul>
        {user ? (
          <li>
            <button type='button' onClick={signOut}>
              Logout
            </button>
          </li>
        ) : (
          <li>
            <Link href='/login'>Login</Link>
          </li>
        )}
        {/* {isLoggedIn ? (
          <li>
            <button type='button' onClick={signOut}>
              로그아웃
            </button>
          </li>
        ) : (
          <li>
            <Link href='/login'>Login</Link>
          </li>
        )} */}
      </ul>
    </div>
  );
}