// lib/getUserData.ts
import { cookies } from 'next/headers';
import supabase from '@/_shared/util/supabase/client';
import { cache } from 'react';
import { UserData } from '../../lib/types/user';

async function fetchUserData() {
  const cookieStore = cookies();
  const token = cookieStore.get('supabase-token')?.value;

  if (!token) {
    return null;
  }

  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    return null;
  }

   // 2. 유저 테이블에서 추가 데이터를 가져옴
   const { data: userData, error: userError } = await supabase
   .from('users') // 'users' 테이블에서
   .select('*') // 모든 컬럼을 선택 (또는 필요한 컬럼들만 선택 가능)
   .eq('uid', user.id); // 사용자의 ID를 기준으로 필터링

    if (userError || !userData || userData.length === 0) {
        return null;
    }
    
  return { 
    uid:user.id,
    email:user.user_metadata.email,
    userId:userData[0].userId,
    nickname:userData[0].nickname,
    profileImg:userData[0].profileImg,
    oneLiner:userData[0].oneLiner,
  } as UserData;
}

// cache를 사용하여 함수 감싸기
const getCachedUserData = cache(fetchUserData);

export async function getMyData() {
  return getCachedUserData();
}