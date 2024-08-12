'use client';

import Image from 'next/image';
import google_logo from '@/_shared/asset/logo/google_login_logo.svg';
import useGoogleLogin from '../../model/hooks/useGoogleLogin';

export default function Loginform() {
  const { signInWithGoogle } = useGoogleLogin();

  return (
    <div>
      <button type='submit' onClick={signInWithGoogle}>
        <Image src={google_logo} alt='google_logo' />
      </button>
    </div>
  );
}