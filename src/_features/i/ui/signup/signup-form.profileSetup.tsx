import { useState } from "react";
import Image from "next/image";
import userIcon from "@/_shared/asset/icon/userIcon.png"
import { useForm } from "react-hook-form";
import { ProfileSetup, SignupFormData } from "../../lib/types/signup";
import { useSignup, useUploadImgGetUrl } from "../../model";
import { signupStore } from "../../lib";



type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

export default function SignupProfileSetup({ setStep }: Props) {
  const { uploadImg } = useUploadImgGetUrl()
  const { signUpUser } = useSignup()
  const [profileImg, setProfileImg] = useState<null|File>(null);
  const [imagePath, setImagePath] = useState('');
  const { signupFormData, setSignupFormData }= signupStore()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ProfileSetup>();

  const onSubmit = async (data:ProfileSetup) => {
    let formData = {} as SignupFormData
    let profileImgUrl = null;

    if (profileImg) {
      // 사진 업로드 로직 수행
      profileImgUrl = await uploadImg(profileImg,'profile_img')
    }

    formData = {...signupFormData, ...data, profileImg:profileImgUrl}

    if(!await signUpUser(formData)) return
    
      setSignupFormData(formData)
      setStep(prev=>prev+1)
  };
  

  // 이미지 미리보기 기능
  const encodeFileToBase64 = (e: React.ChangeEvent<EventTarget & HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if(!file) return
    const reader = new FileReader();
    setProfileImg(file)
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImagePath(reader.result as string);
    };
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex h-full flex-col pt-12 justify-between w-full items-center">
      {/* eslint-disable react/jsx-props-no-spreading */}
      <div className="flex  flex-col justify-center items-center">
        <input 
            id="profile_change" 
            className="hidden" 
            type='file' 
            onChange={encodeFileToBase64}
            />
        <figure>
          <label htmlFor="profile_change" >
            {imagePath ? (
              <div className="flex justify-center items-center w-36 h-36 border border-black rounded-full overflow-hidden">
                <Image src={imagePath} alt="변경한 프로필 사진" width={144} height={144} className="w-full h-full object-cover" />
              </div>            
            ) : (
              <div className="flex justify-center items-center w-36 h-36 border border-black rounded-full overflow-hidden">
                <Image
                  src={userIcon}
                  width={144} 
                  height={144} 
                  className="w-full h-full object-cover"
                  alt="프로필 사진"
                />
              </div>
            )}
          </label>
        </figure>
        <input  
          type='text'
          className="mt-3 w-36 rounded-3xl border bg-transparent py-2 text-center"
          {...register('nickname', { 
            required: '닉네임을 입력해주세요', 
            minLength: {
              value: 4,
              message: '닉네임은 최소 4글자 이상이어야 합니다'
            }
          })}
          placeholder='닉네임'
        />
        {errors.nickname?.message && <p className="ml-3 text-xs text-red-500">{errors.nickname.message}</p>}
      </div>
      <div className="flex flex-col gap-1 w-[14.5625rem]">
        <input className="cursor-pointer py-4 rounded-3xl flex bg-gray-300 text-gray-200" type="button" value="이전" onClick={()=>setStep(prev=>prev-1)} />
        <input className="cursor-pointer py-4 mb-8 rounded-3xl flex bg-blue-default text-white-100" type='submit' value="완료"/>
      </div>
    </form>
  );
}
