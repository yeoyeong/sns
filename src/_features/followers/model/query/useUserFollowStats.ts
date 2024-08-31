import { useQuery } from '@tanstack/react-query';
import { getUserFollowStatsApi } from '../api/getliksStatsApi';
import { FollowingPayload } from '../../lib/types/follow';

const useUserFollowStats = ({ followingId }: FollowingPayload) => {
  const result = useQuery({
    queryKey: ['post_follow', followingId],
    queryFn: () => getUserFollowStatsApi({ followingId }),
    enabled: !!followingId, // uid가 존재할 때만 쿼리 실행
  });
  return {
    data: result.data,
    isLoading: result.isLoading,
    isError: result.isError,
    isSuccess: result.isSuccess,
  };
};

export default useUserFollowStats;