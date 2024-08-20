import { useQuery } from '@tanstack/react-query';
import { getUserStats } from '../api/userStats-api';

const useGetUserStats = ({ uid }: { uid: string }) => {
  const result = useQuery({
    queryKey: ['userStats', uid],
    queryFn: () => getUserStats(uid),
    enabled: !!uid, // uid가 존재할 때만 쿼리 실행
  });
  return {
    data: result.data,
    isLoading: result.isLoading,
    isError: result.isError,
    isSuccess: result.isSuccess,
  };
};

export default useGetUserStats;