import { useInfiniteQuery } from '@tanstack/react-query';
import useIntersect from '@/_shared/lib/hooks/useIntersect';
import { getFollowListApi } from '../api/getFollowListApi';

type Props = {
  limit?: number;
  queryKey?: string | null;
  userId: string;
  type: string;
};
// type = following, follower
const useGetFollowList = ({
  queryKey,
  limit = 2,
  type = 'following',
  userId,
}: Props) => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: ({ pageParam = 1 }) =>
      getFollowListApi({ pageParam, limit, userId, type }),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.hasMore) return undefined;
      return allPages.length + 1; // 다음 페이지의 번호
    },
    initialPageParam: 1, // 초기 페이지 번호를 설정
  });

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target); // 옵저버 제거 더 이상 해당 오브젝트 관찰 x
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  });
  console.log(data);
  const flattenedData = isSuccess ? data.pages.flatMap(page => page.data) : [];

  return {
    data: flattenedData,
    isLoading,
    isError,
    isSuccess,
    ref,
  };
};

export default useGetFollowList;