import { useForm } from "react-hook-form";
import InputField from "./signup-form.inputField";
import { signupStore } from "../../lib";
import { AccountInfo } from "../../lib/types/user";



type Props = {
  setStep:React.Dispatch<React.SetStateAction<number>>
}

export default function SignupAccountInfo({setStep}:Props) {
  const { setSignupFormData }= signupStore()
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    watch
  } = useForm<AccountInfo>();

  const onSubmit = (data:AccountInfo) => {
    const { confirmPassword, ...newData } = data;
    setSignupFormData(newData)
    setStep(prev=>prev+1)
  };

  // TODO: 이메일, 아이디, 중복체크 
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex h-full flex-col pt-12 justify-between">
      {/* eslint-disable react/jsx-props-no-spreading */}
      <div className="flex flex-col">
        <InputField
          name="userId"
          type="text"
          register={register}
          validation={{
            required: '아이디를 입력해주세요',
            minLength: {
              value: 6,
              message: '아이디는 최소 6자 이상이어야 합니다',
            },
            pattern: {
              value: /^[A-Za-z0-9]+$/,
              message: '아이디는 영문자와 숫자만 사용할 수 있습니다',
            },
          }}
          placeholder="아이디"
          error={errors.userId}
        />
        <InputField
        name="password"
        type="password"
        register={register}
        validation={{
          required: '비밀번호를 입력해주세요',
          validate: {
            hasUpperCase: (value:string) => /[A-Z]/.test(value) || '대문자를 포함해야 합니다',
            hasLowerCase: (value:string) => /[a-z]/.test(value) || '소문자를 포함해야 합니다',
            hasNumber: (value:string) => /\d/.test(value) || '숫자를 포함해야 합니다',
            hasSpecialChar: (value:string) => /[!@#$%^&*(),.?":{}|<>]/.test(value) || '특수문자를 포함해야 합니다',
            notEasyPattern: (value:string) =>
              !/(\d)\1{2,}|123|abc|password|qwerty/.test(value) ||
              '비밀번호가 너무 간단합니다',
            notSimilarToUserId: (value:string) =>
              value !== getValues('userId') || '비밀번호가 아이디와 유사합니다',
          },
          }}
          placeholder="비밀번호"
          error={errors.password}
        />

        <InputField
          name="confirmPassword"
          type="password"
          register={register}
          validation={{
            required: '비밀번호를 확인해주세요',
            validate: (value:string) => value === watch('password') || '비밀번호가 일치하지 않습니다'
          }}
          placeholder="비밀번호확인"
          error={errors.confirmPassword}
        />

        <InputField
          name="email"
          type="email"
          register={register}
          validation={{
            required: '이메일을 입력해주세요',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: '유효한 이메일 주소를 입력해주세요',
            },
          }}
          placeholder="이메일"
          error={errors.email}
        />
      </div>
      <input className="cursor-pointer py-1 mb-8 rounded-3xl flex bg-blue-default text-white-100" type='submit' value="다음"/>
    </form>
  );
}
