import { createClient } from '@/_shared/util/supabase/server';
import { NextRequest } from 'next/server';

type Params = {
  request: NextRequest;
  image: File | Buffer;
  imageName: string;
  BUCKETNAME: string;
};
export const uploadImgGetUrlServer = async ({
  request,
  image,
  imageName,
  BUCKETNAME,
}: Params): Promise<string | null> => {
  // Supabase 클라이언트 생성
  const supabase = createClient();

  // 서버 측에서 httpOnly 쿠키를 통해 JWT 토큰을 추출
  const cookie = request.cookies.get('supabase-token');
  const token = cookie ? cookie.value : '';

  if (!token) {
    console.error('Authorization token is required');
    return null;
  }

  // Supabase를 통해 사용자 인증 확인
  const { data: user, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    console.error('Invalid or expired token');
    return null;
  }

  if (!image) {
    console.error('No image provided for upload');
    return null;
  }

  // 파일 이름 생성 및 경로 설정
  const fileExt = imageName.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  // 이미지 업로드
  const { error: uploadError } = await supabase.storage
    .from(BUCKETNAME)
    .upload(filePath, image, {
      cacheControl: '3600',
      upsert: true, // 필요에 따라 조정
      contentType: 'image/webp', // 업로드할 파일의 MIME 타입을 설정
    });

  if (uploadError) {
    console.error('Error uploading file:', uploadError.message);
    return null;
  }

  // 업로드된 이미지의 URL 가져오기
  const { data } = await supabase.storage
    .from(BUCKETNAME)
    .getPublicUrl(filePath);
  return data.publicUrl || null;
};