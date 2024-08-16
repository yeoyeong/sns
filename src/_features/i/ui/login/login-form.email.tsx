import { AccountInfo } from "@/_features/i/lib/types/signup";
import { useForm } from "react-hook-form";
import InputField from "../signup/signup-form.inputField";
import { useAuthActions } from "../../model";



export default function LoginFormEmail() {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<AccountInfo>();
  const { onSubmit } = useAuthActions()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col pt-12">
      {/* eslint-disable react/jsx-props-no-spreading */}
      <div className="flex flex-col">
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
        <InputField
        name="password"
        type="password"
        register={register}
        validation={{
          required: '비밀번호를 입력해주세요',
          }}
          placeholder="비밀번호"
          error={errors.password}
        />
      </div>
      <input className="cursor-pointer py-4 rounded-3xl flex bg-blue-default text-white-100" type='submit' value="로그인"/>
    </form>
  );
}
