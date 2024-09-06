import { create } from 'zustand';

type ChatState = {
  unreadCount: number; // 유저 데이터 타입을 명확히 지정하는 것이 좋습니다.
  setUnreadCount: (payload: number) => void;
};

export const useChatStore =
  create <
  ChatState >
  (set => ({
    unreadCount: 0, // 초기값을 null로 설정
    setUnreadCount: payload => set({ unreadCount: payload }),
  }));