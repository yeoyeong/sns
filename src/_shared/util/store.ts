import { create } from 'zustand';
import { Session, User } from '@supabase/supabase-js';
import supabase from './supabase/client';

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  setAuthState: (user: User | null, session: Session | null) => void;
}

export const useAuthStore =
  create <
  AuthState >
  ((set) => ({
    user: null,
    session: null,
    isLoading: true,
    signIn: async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      const {
        data: { session },
      } = await supabase.auth.getSession(); // 세션 정보 가져오기

      if (error || !user) {
        console.error('Error getting user:', error?.message);
        return;
      }

      set({ user, session, isLoading: false });
    },
    signOut: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error.message);
        return;
      }
      set({ user: null, session: null, isLoading: false });
    },
    setAuthState: (user, session) => set({ user, session, isLoading: false }),
  }));

// 초기화 및 상태 감시
supabase.auth.onAuthStateChange((_event, session) => {
  const user = session?.user || null;
  useAuthStore.getState().setAuthState(user, session);
});