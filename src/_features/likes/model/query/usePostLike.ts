import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postLikeApi } from '../api/postLikeApi';
import { LikePayload } from '../../lib/types/likesType';

const usePostLike = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postLikeApi,

    onMutate: async (payload: LikePayload) => {
      await queryClient.cancelQueries({
        queryKey: ['post_likes', payload.post_id],
      });

      const previousLikes = queryClient.getQueryData([
        'post_likes',
        payload.post_id,
      ]);

      queryClient.setQueryData(['post_likes', payload.post_id], (old: any) => {
        return !old;
      });

      return { previousLikes };
    },
    onError: (error, payload, context) => {
      queryClient.setQueryData(
        ['post_likes', payload.post_id],
        context?.previousLikes
      );
      alert('오류가 발생하였습니다. 관리자에게 문의해주세요');
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log('Unknown error occurred:', error);
      }
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['post_likes', variables.post_id],
      });
    },
  });

  return {
    mutation,
  };
};

export default usePostLike;