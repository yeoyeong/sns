import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCommentsApi } from '../api/deleteCommentsApi';

const useDeleteComments = () => {
  const queryClient = useQueryClient();
  //   const router = useRouter(); // 라우팅을 위해 사용

  const mutation = useMutation({
    mutationFn: deleteCommentsApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
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

  const onDelete = async (
    comment_id: number,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (!comment_id) return;
    try {
      await mutation.mutateAsync({ comment_id });
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    onDelete,
  };
};

export default useDeleteComments;