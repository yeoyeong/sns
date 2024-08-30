import { create } from 'zustand';

// Define the type for the store
type TypingState = {
  isTyping: number | null;
  setIsTyping: (value: number | null) => void;
};

// Create the Zustand store with the defined types
const useTypingStore =
  create <
  TypingState >
  (set => ({
    isTyping: null, // Initial value for isTyping
    setIsTyping: (value: number | null) => set({ isTyping: value }),
  }));

export default useTypingStore;