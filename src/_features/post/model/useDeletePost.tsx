import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePostApi } from './api/deletePostApi';

const useDeletePost = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deletePostApi,
    onSuccess: () => {
      alert('성공적으로 완료되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
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

  const deletePostHandler = async ({ postId }: { postId: number }) => {
    if (!postId) return;
    try {
      await mutation.mutateAsync({ postId });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    deletePostHandler,
  };
};

export default useDeletePost;