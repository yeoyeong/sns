'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useParams, useSearchParams } from 'next/navigation';
import supabase from '@/_shared/util/supabase/client';
import { useUserStore } from '@/_shared/util/userStore';
import useUpload from '@/_features/write/lib/hooks/useUpload';
import InputPhoto from '@/_features/write/ui/writeForm.photo';
import writeStore from '@/_features/write/lib/store/store';
import { Message } from '../lib/types';
import useFetchMessages from '../model/query/useFetchMessages';
import { createRoom } from '../model/api/createRoom';
import { checkRoomExists } from '../model/api/checkRoomExists';
import useSendMessage from '../model/query/useSendMessage';
import ChatTargetMessage from './Chat.targetMessage';
import ChatMyMessage from './Chat.myMessage';




export default function Chat() {
  const { roomId } = useParams();
  const roomIdStr = Array.isArray(roomId) ? roomId[0] : roomId;
  const searchParams = useSearchParams();
  const uid_1 = searchParams.get('uid_1');
  const uid_2 = searchParams.get('uid_2');

  const [newMessage, setNewMessage] = useState<string>('');
  const [inputPhotoReFetch, setInputPhotoReFetch] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [image, setImage] = useState<File | null>();
  const { picture, setPicture }= writeStore()
  const { uploadImgGetUrl } = useUpload({storageName:'chat_img'})
  const { user } = useUserStore();

  const {
    data: messages,
    isLoading,
    refetch: refetchMessages,
  } = useFetchMessages({ roomId: roomIdStr });
  const { mutateAsync }= useSendMessage();


  // 구독 및 메시지 패칭을 연동
  useEffect(() => {
    if (!roomId) return;

    const subscribeToMessages = async () => {
      const channel = supabase
        .channel(`room-messages-${roomId}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'messages',
            filter: `room_id=eq.${roomId}`,
          },
          () => {
            refetchMessages(); // 메시지가 추가될 때 리패칭
          }
        )
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'messages',
            filter: `room_id=eq.${roomId}`,
          },
          () => {
            refetchMessages(); // 메시지가 업데이트될 때 리패칭
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel); // 구독 해제
      };
    };

    subscribeToMessages();
  }, [roomId, refetchMessages]);

  // 메시지를 읽음 상태로 표시하는
  useEffect(() => {
    const markMessagesAsRead = async () => {
      try {
        if (!user) return; // 유저 정보가 없으면 아무것도 하지 않음

        // 본인이 보낸 메시지를 제외한 읽지 않은 메시지 필터링
        const unreadMessages = messages.filter(
          (message: Message) =>
            !message.is_read && message.user_uid !== user.uid
        );
        if (unreadMessages.length === 0) return; // 읽지 않은 메시지가 없으면 종료

        // 읽지 않은 메시지를 읽음 처리
        const updatePromises = unreadMessages.map((message: Message) =>
          fetch('/api/chat/messages/read', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ messageId: message.id }),
          })
        );

        // 모든 읽지 않은 메시지의 상태를 업데이트
        await Promise.all(updatePromises);
        refetchMessages(); // 메시지가 추가될 때 리패칭
      } catch (error) {
        console.error('Failed to mark messages as read:', error);
      }
    };

    // 채팅방에 들어왔을 때 읽지 않은 메시지를 읽음 처리
    markMessagesAsRead();
  }, [messages, roomId]);


  // 방 존재 여부 확인
  useEffect(() => {
    const checkAndCreateRoom = async () => {
      if (!roomId || !user || !uid_1 || !uid_2) return;
      try {
        const data = await checkRoomExists(roomIdStr);
        // 방이 존재하지 않는다면 새로운 방 생성
        if (!data.exists) {
          await createRoom({roomId: roomIdStr,uid_1,uid_2,});
        } else {
          refetchMessages();
        }
      } catch (error) {
        console.error('Error checking or creating room:', error);
      }
    };

    checkAndCreateRoom();
  }, [roomId, user, uid_1, uid_2]);

  // 메시지 전송 함수 (API 호출)
  const handleMessageSend = async () => {
    let pictures: (string | File)[] = [];
    if (!user) return;
    try {
      pictures = await uploadImgGetUrl({ picture });
      const response = await mutateAsync({
        content: newMessage,
        imageUrl:pictures,
        userUId: user.uid,
        roomId:roomIdStr,
      })
      if (response.ok) {
        refetchMessages();
        setNewMessage('');
        setPicture([]);
        setInputPhotoReFetch((prev)=>prev===1? prev-1 : prev+1)
      }
    } catch (error) {
      console.error(error);
    }
  };

  // messages가 변경될 때마다 스크롤을 맨 아래로 이동
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]); // messages가 변경될 때마다 실행
  
  if(isLoading || !user) return <div>로딩중</div>
  
  return (
    <div>
      <div className='h-[400px] overflow-y-scroll px-5' ref={scrollRef}>
        {messages.map((message:Message) => (
          message.user_uid === user.uid ?
            <ChatMyMessage message={message}/>
            :<ChatTargetMessage message={message}/>
        ))}
      </div>
      <div>
        <div className='flex px-4 mt-2 gap-2'>
          <input
            type='text'
            className='w-full'
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            placeholder='메세지를 입력해주세요 ...'
          />
          <button type='button' className='bg-blue-default text-white-100 rounded-lg px-2' onClick={handleMessageSend}>
            Send
          </button>
        </div>
        <div className='px-2 mt-2'>
            <InputPhoto key={inputPhotoReFetch} />
        </div>
      </div>
    </div>
  );
}