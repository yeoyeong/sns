import { create } from 'zustand';

// Zustand 스토어 생성
const useUserStore = create((set) => ({
  user: null, // 유저 초기 상태는 null로 설정
  // TODO: userData 타입 정하기
  setUser: (userData: any) => set({ user: userData }), // 유저 정보 업데이트 함수
  clearUser: () => set({ user: null }), // 유저 정보 초기화 함수
}));

export default useUserStore;