import { useQuery } from '@tanstack/react-query';
import { fetchMessages } from '../api/fetchMessages';

const useFetchMessages = ({ roomId }: { roomId: string }) => {
  const result = useQuery({
    queryKey: ['chat', roomId],
    queryFn: () => fetchMessages(roomId),
    enabled: !!roomId, // uid가 존재할 때만 쿼리 실행
  });

  return result;
};

export default useFetchMessages;