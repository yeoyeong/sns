'use client';

import useGoogleLogin from '../../model/hooks/useGoogleLogin';

export default function Loginform() {
  const { signInWithGoogle } = useGoogleLogin();

  return (
    <div>
      <button type='submit' onClick={signInWithGoogle}>
        Sign In with Google
      </button>
    </div>
  );
}