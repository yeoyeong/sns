import { useQuery } from '@tanstack/react-query';
import { getPostDetailApi } from '../api/getPostDetailApi';
import { GetPostType } from '../../lib/type/getPostType';

type Props = {
  postId: string;
};

const useGetPostDetail = ({ postId }: Props) => {
  // prettier-ignore
  const { data, isLoading, isError, isSuccess } = useQuery<{post:GetPostType}>({ 
    queryKey: ['posts', postId],
    queryFn: () => getPostDetailApi({ postId }),
  });

  return {
    data: data && data.post,
    isLoading,
    isError,
    isSuccess,
  };
};

export default useGetPostDetail;