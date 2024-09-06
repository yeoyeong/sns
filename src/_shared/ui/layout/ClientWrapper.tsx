'use client';

import { fetchUnreadCount } from '@/_features/chat/model/api/fetchUnreadCount';
import { useChatStore } from '@/_features/chat/model/store';
import { UserData } from '@/_features/i/lib/types/user';
import supabase from '@/_shared/util/supabase/client';
import { useUserStore } from '@/_shared/util/userStore';
import { useEffect } from 'react';

interface ClientWrapperProps {
  user: UserData | null;
  children: React.ReactNode;
}

function ClientWrapper({ user, children }: ClientWrapperProps) {
  const { setUser } = useUserStore();
  const { setUnreadCount } = useChatStore();

  const unreadCount = async () => {
    const data = await fetchUnreadCount(); // 업데이트 후 다시 계산
    setUnreadCount(data.unreadCount);
  };
  useEffect(() => {
    if (!user) return;
    const subscribeToMessages = () => {
      const channel = supabase
        .channel('public:messages') // 메시지 테이블에 대한 구독 설정
        .on(
          'postgres_changes',
          {
            event: 'INSERT', // 메시지가 추가될 때 구독
            schema: 'public',
            table: 'messages',
          },
          async payload => {
            const newMessage = payload.new;

            // 현재 사용자의 uid와 새로 추가된 메시지의 user_uid 비교
            if (newMessage.user_uid !== user.uid) {
              alert(`새로운 메시지가 도착했습니다: ${newMessage.content}`);
              unreadCount();
            }
          }
        )
        .subscribe();

      return () => {
        // 컴포넌트 언마운트 시 구독 해제
        supabase.removeChannel(channel);
      };
    };
    unreadCount();
    subscribeToMessages();
  }, [user]); // user가 업데이트되면 구독을 다시 설정

  useEffect(() => {
    if (!user) return;
    setUser(user);
  }, [user, setUser]);

  return <div>{children}</div>;
}

export default ClientWrapper;