import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendMessage } from '../api/sendMessage';

const useSendMessage = () => {
  const queryClient = useQueryClient();
  //   const router = useRouter(); // 라우팅을 위해 사용

  const mutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
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

  //   const createPostHandler = async (formData: any) => {
  //     if (!formData) return;
  //     try {
  //       await mutation.mutateAsync(formData);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  return mutation;
};

export default useSendMessage;