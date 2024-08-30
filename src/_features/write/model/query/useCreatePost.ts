import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { WritingFormData } from '../../lib/types/write';
import { createPostApi } from '../api/createPostApi';

const useCreatePost = () => {
  const queryClient = useQueryClient();
  const router = useRouter(); // 라우팅을 위해 사용

  const mutation = useMutation({
    mutationFn: createPostApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      router.back(); // 이전 페이지로 돌아가기
    },
    onError: (error) => {
      alert('오류가 발생하였습니다. 관리자에게 문의해주세요');
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log('Unknown error occurred:', error);
      }
    },
  });

  const createPostHandler = async (formData: WritingFormData) => {
    if (!formData) return;
    try {
      await mutation.mutateAsync(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    createPostHandler,
  };
};

export default useCreatePost;