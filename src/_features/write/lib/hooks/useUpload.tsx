import { uploadImg } from '../../model/api/uploadImageApi';
import { WritingFormData } from '../types/write';

type Props = {
  storageName?: string;
};
export default function useUpload({ storageName = 'post_img' }: Props = {}) {
  const uploadImgGetUrl = async ({
    picture,
  }: {
    picture: (File | string)[];
  }): Promise<string[]> => {
    const uploadPromises = picture.map(async (el: File | string) => {
      try {
        if (typeof el === 'string') return el;
        const result = await uploadImg(el, storageName);
        if (result === null) return null;
        return result;
      } catch (err) {
        console.error(`Error uploading image for element: ${el}`, err);
        return null;
      }
    });
    const results = await Promise.all(uploadPromises);
    return results.filter(result => result !== null) as string[]; // null이 아닌 결과만 반환
  };

  const onSubmit = async ({
    data,
    postHandler,
    picture,
  }: {
    data: WritingFormData;
    postHandler: (data: WritingFormData) => void;
    picture: (File | string)[];
  }) => {
    const pictures = await uploadImgGetUrl({ picture });
    postHandler({ ...data, picture: pictures });
  };

  return {
    onSubmit,
    uploadImgGetUrl,
  };
}