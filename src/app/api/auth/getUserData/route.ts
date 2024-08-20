import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import supabase from '@/_shared/util/supabase/client';

export async function GET() {
  // 쿠키에서 JWT 토큰 가져오기
  const token = cookies().get('supabase-token')?.value;

  if (!token) {
    return NextResponse.json(
      { error: 'Authentication token not found' },
      { status: 401 }
    );
  }

  // Supabase에서 토큰 검증
  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data) {
    return NextResponse.json(
      { error: 'Invalid or expired token' },
      { status: 401 }
    );
  }

  // 사용자 인증 성공 후 데이터 가져오기 (예: 프로필 데이터)
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('uid', data.user.id);

  if (userError) {
    return NextResponse.json({ error: userError.message }, { status: 500 });
  }

  return NextResponse.json({ ...data.user, ...userData[0] });
}