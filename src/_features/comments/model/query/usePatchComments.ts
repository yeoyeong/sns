import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchCommentsApi } from '../api/patchCommentsApi';
import { CommentPatchPayload } from '../../lib/types/commentsType';

const usePatchComments = () => {
  const queryClient = useQueryClient();
  //   const router = useRouter(); // 라우팅을 위해 사용

  const mutation = useMutation({
    mutationFn: patchCommentsApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
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

  const createPostHandler = async (formData: CommentPatchPayload) => {
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

export default usePatchComments;