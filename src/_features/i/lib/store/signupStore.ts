import { create } from 'zustand';
import { SignupFormData, SignupStore } from '../types/user';

const signupStore =
  create <
  SignupStore >
  ((set) => ({
    signupFormData: {
      userId: '',
      password: '',
      email: '',
      profileImg: null,
      nickname: '',
      oneLiner: '',
    } as SignupFormData,
    setSignupFormData: (data) =>
      set((state) => ({
        signupFormData: { ...state.signupFormData, ...data },
      })),
  }));

export default signupStore;