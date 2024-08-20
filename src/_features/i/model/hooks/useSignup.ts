
// 지금 안씀

import supabase from '@/_shared/util/supabase/client';
import { SignupFormData } from '../../lib/types/user';

const useSignup = () => {
  const signUpUser = async (formData: SignupFormData) => {
    // 회원가입 로직
    const { email, password, userId, nickname, profileImg } = formData;
    // 이메일과 비밀번호로 사용자 생성
    const signUpData = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          displayName: userId,
        },
      },
    });
    if (signUpData.error) {
      // TODO: 에러처리 커스텀 에러창 만들기
      // console.error('Error signing up:', signUpData.error.message);
      return false;
    }
    // const { user, session } = signUpData.data;
    // TODO: 토큰 처리
    const { user } = signUpData.data;

    if (!user) {
      // TODO: 에러처리 커스텀 에러창 만들기
      return false;
    }

    // 별도의 테이블에 추가 사용자 정보 저장
    const { error: dbError } = await supabase
      .from('users') // 예를 들어 'profiles' 테이블 사용
      .insert([
        {
          uid: user.id, // 인증된 사용자의 ID 사용
          nickname,
          profileImg,
          // 기타 정보 추가
        },
      ]);
    if (dbError) {
      // TODO: 에러처리 커스텀 에러창 만들기
      // console.error('Error inserting user data:', dbError.message);
      return false;
    }
    return true;
  };

  return { signUpUser };
};

export default useSignup;