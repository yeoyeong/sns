import { create } from 'zustand';
import { SignupStore } from './types/signup';

const signupStore =
  create <
  SignupStore >
  ((set) => ({
    signupFormData: {
      id: '',
      password: '',
      confirmPassword: '',
      email: '',
      profileImg: '',
      nickname: '',
      oneLiner: '',
    },
    setSignupFormData: (action) =>
      set((state) => ({ signupFormData: action(state.signupFormData) })),
  }));

export default signupStore;