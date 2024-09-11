import sharp from 'sharp';
import { NextRequest, NextResponse } from 'next/server';
import { uploadImgGetUrlServer } from '../lib/uploadImgGetUrlServer';

export async function POST(request: NextRequest) {
  try {
    // 요청에서 이미지를 가져옵니다.
    const formData = await request.formData();
    const image = formData.get('image') as File;
    const bucketName = formData.get('bucketName') as string;

    // 이미지가 없으면 에러 응답을 반환합니다.
    if (!image) {
      return NextResponse.json({ error: 'Image is required' }, { status: 400 });
    }

    // File 객체를 ArrayBuffer로 변환
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer); // Buffer로 변환

    // Sharp를 사용하여 이미지를 최적화 (예: WebP로 변환)
    const optimizedImageBuffer = await sharp(buffer)
      .webp({ quality: 80 }) // WebP로 변환, 품질 설정
      .toBuffer();

    // 스토리지 버킷 이름을 정의합니다.
    const BUCKETNAME = bucketName;

    // 이미지를 업로드하고 URL을 가져옵니다.
    const imageUrl = await uploadImgGetUrlServer({
      request,
      image: optimizedImageBuffer || image,
      imageName: optimizedImageBuffer
        ? `${image.name.replace(/\.[^/.]+$/, '')}.webp`
        : image.name,
      BUCKETNAME,
    });

    // 이미지 URL이 없으면 에러 응답을 반환합니다.
    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Failed to upload image' },
        { status: 500 }
      );
    }

    // 성공적으로 업로드된 이미지 URL을 반환합니다.
    return NextResponse.json({ imageUrl }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      // 타입 가드 사용
      console.error(error.message);
    } else {
      console.error('An unexpected error occurred', error);
    }
  }
}