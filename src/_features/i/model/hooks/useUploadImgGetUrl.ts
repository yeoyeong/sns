import supabase from '@/supabaseClient';

const useUploadImgGetUrl = () => {
  const getProfileImgURL = (
    BUCKETNAME: string,
    filePath: string
  ): string | null => {
    const { data } = supabase.storage
      .from(BUCKETNAME) // 여기에 실제 버킷 이름을 입력합니다.
      .getPublicUrl(filePath);

    if (!data || !data.publicUrl) {
      // TODO: 에러처리
      return null;
    }
    return data.publicUrl;
  };

  const uploadImg = async (
    image: File,
    BUCKETNAME: string
  ): Promise<string | null> => {
    if (!image) {
      // TODO: 기본이미지 처리
      return null;
    }
    const fileExt = image.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKETNAME) // 여기에 실제 버킷 이름을 입력합니다.
      .upload(filePath, image);

    // 업로드 후 에러가 있는지 확인
    if (uploadError) {
      // TODO: 에러처리
      // alert('Error uploading file:', uploadError.message);
      return null;
    }
    const publicUrl = getProfileImgURL(BUCKETNAME, filePath);
    if (typeof publicUrl === 'string') return publicUrl;
    return null;
  };

  return { uploadImg };
};

export default useUploadImgGetUrl;