import supabase from '@/_shared/util/supabase/client';
import { useRouter } from 'next/navigation';

const useAuthActions = () => {
  const router = useRouter();

  // 이메일 로그인
  const onSubmit = async (formData: { email: string; password: string }) => {
    const { data, error } = await supabase.auth.signInWithPassword(formData);
    if (error) {
      console.error('Login error:', error.message);
      // TODO: Login error: Invalid login credentials 에러처리
      return null;
    }

    console.log('Login successful:', data);
    // TODO: 로그인데이터 Zustand 관리
    router.push('/');

    return null;
  };

  // 로그아웃
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      // TODO: 에러처리 !
      console.error('Logout error:', error.message);
    } else {
      router.push('/');
    }
  };

  return { signOut, onSubmit };
};

export default useAuthActions;