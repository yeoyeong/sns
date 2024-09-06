import { useEffect } from 'react';
import { Room } from '../lib/types';
import OpenChatLinkProvider from './OpenChatLinkProvider';
import { fetchUnreadCount } from '../model/api/fetchUnreadCount';
import { useChatStore } from '../model/store';

type Props = {
  room: Room;
};
export default function ChatRoom({ room }: Props) {
  const { unreadCount, setUnreadCount } = useChatStore();
  useEffect(() => {
    const unreadCountHandler = async () => {
      try {
        const data = await fetchUnreadCount({
          roomId: room.roomId,
        });
        setUnreadCount(data.unreadCount);
      } catch (error) {
        console.error('Failed to fetch unread messages:', error);
      }
    };
    unreadCountHandler();
  }, [room]);

  //   useEffect(() => {
  //     const fetchUnreadCount = async () => {
  //       try {
  //         const response = await fetch(
  //           `/api/chat/messages/unread?roomId=${room.roomId}`
  //         );
  //         const data = await response.json();
  //         setUnreadCount(data.unreadCount);
  //       } catch (error) {
  //         console.error('Failed to fetch unread messages:', error);
  //       }
  //     };

  //     // 최초에 읽지 않은 메시지 수 가져오기
  //     fetchUnreadCount();

  //     // Supabase 실시간 구독 설정
  //     const channel = supabase
  //       .channel(`room-messages-${room.roomId}`)
  //       .on(
  //         'postgres_changes',
  //         {
  //           event: 'INSERT', // 메시지가 새로 추가될 때 트리거
  //           schema: 'public',
  //           table: 'messages',
  //           filter: `room_id=eq.${room.roomId}`,
  //         },
  //         payload => {
  //           // 새 메시지가 도착하면 읽지 않은 메시지 수 다시 가져오기
  //           fetchUnreadCount();
  //         }
  //       )
  //       .subscribe();

  //     // 컴포넌트가 언마운트될 때 구독 해제
  //     return () => {
  //       supabase.removeChannel(channel);
  //     };
  //   }, [room.roomId]);

  return (
    <div>
      <OpenChatLinkProvider
        uid_1={room.participants[0]}
        uid_2={room.participants[1]}>
        <div className='flex items-center justify-between rounded-lg px-2 py-4 hover:bg-gray-100'>
          <p>{room.roomName ? room.roomName : '(제목 없음)'}</p>
          <p>{room.lastMessage?.content}</p>
          {unreadCount > 0 && (
            <div className='text-white-100 flex h-3 items-center justify-center rounded-full bg-red-500 px-1 py-2 text-xs'>
              <p>{unreadCount}</p>
            </div>
          )}
        </div>
      </OpenChatLinkProvider>
    </div>
  );
}