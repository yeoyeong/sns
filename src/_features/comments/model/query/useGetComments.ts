import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getCommentsApi } from '../api/getCommentsApi';
import { Comment } from '../../lib/types/commentsType';

const useGetComments = ({
  post_id,
}: {
  post_id: number;
}): UseQueryResult<Comment[]> => {
  const result = useQuery<Comment[]>({
    queryKey: ['comments', post_id],
    queryFn: () => getCommentsApi({ post_id }),
    enabled: !!post_id, // uid가 존재할 때만 쿼리 실행
  });

  return {
    data: result.data,
    isLoading: result.isLoading,
    isError: result.isError,
    isSuccess: result.isSuccess,
  } as UseQueryResult<Comment[]> ;
};

export default useGetComments;