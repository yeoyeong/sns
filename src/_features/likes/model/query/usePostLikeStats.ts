import { useQuery } from '@tanstack/react-query';
import { getliksStatsApi } from '../api/getliksStatsApi';
import { LikePayload } from '../../lib/types/likesType';

const usePostLikeStats = ({ post_id }: LikePayload) => {
  const result = useQuery({
    queryKey: ['post_likes', post_id],
    queryFn: () => getliksStatsApi(post_id),
    enabled: !!post_id, // uid가 존재할 때만 쿼리 실행
  });
  return {
    data: result.data,
    isLoading: result.isLoading,
    isError: result.isError,
    isSuccess: result.isSuccess,
  };
};

export default usePostLikeStats;