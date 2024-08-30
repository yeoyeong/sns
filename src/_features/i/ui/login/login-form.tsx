'use client';

import Link from 'next/link';
import ImodalLayout from '@/_shared/ui/layout/i-modal-layout';
import Image from 'next/image';
import GoogleLogo from '@/_shared/asset/logo/google_login_logo.svg';
import { useGoogleLogin } from '../../model';
import LoginFormEmail from './login-form.email';

export default function Loginform() {
  const { signInWithGoogle } = useGoogleLogin();

  return (
    <ImodalLayout>
      <LoginFormEmail />
      <div className='mb-8 w-[213px] text-right'>
        <Link className='text-xl' href='/signup'>
          회원가입
        </Link>
      </div>
      <button type='submit' onClick={signInWithGoogle}>
        <GoogleLogo />
      </button>
    </ImodalLayout>
  );
}