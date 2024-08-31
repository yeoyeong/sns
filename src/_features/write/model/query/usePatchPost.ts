import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { WritingFormData } from '../../lib/types/write';
import { patchPostApi } from '../api/patchPostApi';

const usePatchPost = ({ postId }: { postId: string }) => {
  const queryClient = useQueryClient();
  const router = useRouter(); // 라우팅을 위해 사용

  const mutation = useMutation({
    mutationFn: ({ formData }: { formData: WritingFormData }) =>
      patchPostApi(formData, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      router.back(); // 이전 페이지로 돌아가기
    },
    onError: error => {
      alert('오류가 발생하였습니다. 관리자에게 문의해주세요');
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log('Unknown error occurred:', error);
      }
    },
  });

  const patchPostHandler = async (formData: WritingFormData) => {
    if (!formData || !postId) return;
    try {
      await mutation.mutateAsync({ formData });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    patchPostHandler,
  };
};

export default usePatchPost;