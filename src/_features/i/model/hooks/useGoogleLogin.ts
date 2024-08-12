import supabase from '@/supabaseClient';

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