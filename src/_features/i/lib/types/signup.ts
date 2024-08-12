type SignupFormData = {
  id: string;
  password: string;
  confirmPassword: string;
  email: string;
  profileImg: string;
  nickname: string;
  oneLiner: string;
};

type SignupStore = {
    signupFormData: SignupFormData;
    setSignupFormData: (action: (prev: SignupFormData) => SignupFormData) => void;
};

export type {SignupFormData, SignupStore};

  