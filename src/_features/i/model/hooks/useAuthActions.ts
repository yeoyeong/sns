import { useRouter } from 'next/navigation';
import { SignupFormData } from '../../lib/types/user';
import { SignOutApi } from '../api/signOut-api';

const useAuthActions = () => {
  const router = useRouter();

  // 이메일 회원가입
  const signupUser = async (formData: SignupFormData) => {
    const a = fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log('User signed up successfully!');
          console.log(data.user);
          return true;
        }
        console.error('Error signing up:', data.error);
        return false;
      })
      .catch((error) => {
        console.error('Request failed:', error);
        return false;
      });
    return a;
  };

  // 이메일 로그인
  const onSubmit = async (formData: { email: string; password: string }) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const error = await response.json();
        console.error('Login error:', error.error);
        return; // 에러가 발생한 경우 더 이상 진행하지 않고 함수를 종료합니다.
      }
      const data = await response.json();
      console.log('User data:', data);
      router.push('/');
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      // 네트워크 오류 등 처리
    }
  };

  // 로그아웃
  const signOut = async () => {
    try {
      await SignOutApi();
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      // TODO: 에러처리
    }
  };

  return { signupUser, signOut, onSubmit };
};

export default useAuthActions;