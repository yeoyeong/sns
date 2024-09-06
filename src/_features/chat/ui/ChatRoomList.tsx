'use client';

import { useUserStore } from '@/_shared/util/userStore';
import supabase from '@/_shared/util/supabase/client';
import { useEffect, useState } from 'react';
import { Room } from '../lib/types';
import ChatRoom from './ChatRoom';


export default function ChatRoomList() {
  const [roomList, setRoomList] = useState<Room[]>([]);
  const { user } = useUserStore();

  useEffect(() => {
    if (!user) return;

    // 방 리스트를 가져오는 함수
    const fetchRooms = async () => {
      try {
        const response = await fetch(`/api/chat/myrooms`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch rooms');
        }

        const data = await response.json();
        setRoomList(data); // 받은 데이터를 상태에 저장

        // 각 방의 room_id로 실시간 구독 설정
        data.forEach((room:Room) => {
          const channel = supabase
            .channel(`room-messages-${room.roomId}`) // 각 방에 대한 구독 설정
            .on(
              'postgres_changes',
              {
                event: 'INSERT', // 메시지가 새로 추가될 때 트리거
                schema: 'public',
                table: 'messages',
                filter: `room_id=eq.${room.roomId}`, // 방 ID로 필터링
              },
              () => {
                // 메시지가 도착하면 방 리스트 다시 가져오기
                fetchRooms();
              }
            )
            .subscribe();

          // 컴포넌트 언마운트 시 구독 해제
          return () => {
            supabase.removeChannel(channel);
          };
        });
      } catch (err) {
        console.error(err);
      }
    };

    // 최초 방 리스트 가져오기
    fetchRooms();
  }, [user]);

  return (
    <ul className='px-4'>
      {Array.isArray(roomList) &&
        roomList.map(room => (
          <li key={room.roomId}>
            <ChatRoom room={room}/>
          </li>
        ))}
    </ul>
  );
}