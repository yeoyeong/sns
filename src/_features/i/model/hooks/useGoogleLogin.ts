import supabase from '@/_shared/util/supabase/client';

type UseGoogleLoginResult = {
  signInWithGoogle: () => Promise<void>;
};

const useGoogleLogin = (): UseGoogleLoginResult => {
  const signInWithGoogle = async () => {
    // const { data, error } = await supabase.auth.signInWithOAuth({
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000',
      },
    });
  };

  return { signInWithGoogle };
};

export default useGoogleLogin;