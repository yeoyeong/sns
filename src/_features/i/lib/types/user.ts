

type AccountInfo = {
  userId: string;
  password: string;
  confirmPassword?: string;
  email: string;
};
type ProfileSetup = {
  profileImg: string | null | undefined;
  nickname: string;
  oneLiner: string;
};

type SignupFormData = AccountInfo & ProfileSetup;

type SignupStore = {
    signupFormData: SignupFormData;
    // setSignupFormData: (action: (prev: AccountInfo | ProfileSetup) => SignupFormData) => void;
    setSignupFormData: (data: Partial<SignupFormData>) => void;
};

type UserData = {
  uid: string;
  userId: string;
  nickname: string;
  profileImg: string;
  oneLiner: string;
};

export type { AccountInfo, ProfileSetup, SignupFormData, SignupStore, UserData };

  