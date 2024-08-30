// lib/getUserData.ts
import { cookies } from 'next/headers';
import supabase from '@/_shared/util/supabase/client';
import { cache } from 'react';
import { UserData } from '../../lib/types/user';

// 캐시된 데이터를 저장할 변수
const cachedUserData: { [key: string]: UserData | null } = {};

async function fetchUserData(user_id:string|null) {
  const cookieStore = cookies();
  const token = cookieStore.get('supabase-token')?.value;

  if (!token) {
    return null;
  }

   // 유효한 세션인지 확인
   // 세션을 직접 가져오지 않고 유저 데이터를 검증
  const { data: user, error: userError } = await supabase.auth.getUser(token);

  if (userError || !user) {
    return null;
  }

   // 2. 유저 테이블에서 추가 데이터를 가져옴
   const { data: userData, error: userErrorData } = await supabase
   .from('users') // 'users' 테이블에서
   .select('*') // 모든 컬럼을 선택 (또는 필요한 컬럼들만 선택 가능)
   .eq(!user_id ? 'uid':'userId' , !user_id ? user.user.id : user_id); // 사용자의 ID를 기준으로 필터링

    if (userErrorData || !userData || userData.length === 0) {
        return null;
    }
    
  const userDetails: UserData = {
    uid: userData[0].uid,
    userId: userData[0].userId,
    nickname: userData[0].nickname,
    profileImg: userData[0].profileImg,
    oneLiner: userData[0].oneLiner,
  };

  // 캐시에 저장
  cachedUserData[user_id || user.user.id] = userDetails;

  return userDetails;
}

// 캐시된 데이터를 무효화하는 함수
export function invalidateUserDataCache(username: string | null) {
  const cacheKey = username || 'default';
  cachedUserData[cacheKey] = null;
}


// cache를 사용하여 함수 감싸기
const getCachedUserData = cache(fetchUserData);

export async function getUserData(username:string|null) {
  return getCachedUserData(username);
}

