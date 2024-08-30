import { UserData } from '@/_features/i/lib/types/user';
import { create } from 'zustand';

type UserState = {
  user: UserData; // 유저 데이터 타입을 명확히 지정하는 것이 좋습니다.
  setUser: (user: UserData) => void;
};

export const userPageStore =
  create <
  UserState >
  (set => ({
    user: {} as UserData, // 초기값을 null로 설정
    setUser: user => set({ user }),
  }));