import { useState } from "react";
import Image from "next/image";
import userIcon from "@/_shared/asset/icon/userIcon.png"
import { useForm } from "react-hook-form";
import { useUploadImgGetUrl } from "@/_features/i/model";
import { ProfileSetup } from "@/_features/i/lib/types/user";
import { patchPostApi } from "../model/api/patchUserData";
import { userPageStore } from "../lib/types/store/store";


type Props = {
  onClose: () => void;
};

export default function ProfilePatch({onClose}:Props) {
  const { user, setUser } = userPageStore()
  const { uploadImg } = useUploadImgGetUrl()
  const [profileImg, setProfileImg] = useState<null|File>(null);
  const [imagePath, setImagePath] = useState(user?.profileImg??'');
  
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ProfileSetup>();

  const onSubmit = async (data: ProfileSetup) => {
    try {
      let formData = {} as ProfileSetup;
      let profileImgUrl = null;
  
      if (profileImg) {
        // 사진 업로드 로직 수행
        profileImgUrl = await uploadImg(profileImg, 'profile_img');
      }
  
      formData = { ...data, profileImg: profileImgUrl || user?.profileImg };
  
      const res = await patchPostApi(formData);
      setUser(res.data)
      onClose()
    } catch (error) {
      // TODO: 에러처리
      console.error(error);
      alert('오류 발생');
    }
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

  // 이미지 제거
  const profileImgDelete = () => {
    setImagePath("")
    setProfileImg(null)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex h-full flex-col pt-7 justify-between w-full items-center">
      {/* eslint-disable react/jsx-props-no-spreading */}
      <div className="flex flex-col justify-center items-center w-full">
        <input 
            id="profile_change" 
            className="hidden" 
            type='file' 
            onChange={encodeFileToBase64}
            />
        <figure>
          <label htmlFor="profile_change" className="cursor-pointer" >
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
        <button type="button" onClick={profileImgDelete} className="mt-1 mb-3 font-bold text-gray-300 text-sm">
          아바타 제거
        </button>
        <input  
          type='text'
          className="w-36 rounded-3xl border bg-transparent py-1 text-center"
          {...register('nickname', { 
            required: '닉네임을 입력해주세요', 
            minLength: {
              value: 4,
              message: '닉네임은 최소 4글자 이상이어야 합니다'
            }
          })}
          defaultValue={user?.nickname}
          placeholder="닉네임을 입력해주세요."
        />
        {errors.nickname?.message && <p className="ml-3 text-xs text-red-500">{errors.nickname.message}</p>}
        <input  
          type='text'
          className="mt-1 w-4/6 rounded-3xl border bg-transparent py-1 text-center"
          {...register('oneLiner', { 
            maxLength: {
              value: 16,
              message: '한줄 소개는 최대 16글자 이하로 가능합니다'
            }
          })}
          defaultValue={user?.oneLiner}
          placeholder='한 줄 소개 . . .'
        />
        {errors.oneLiner?.message && <p className="ml-3 text-xs text-red-500">{errors.oneLiner.message}</p>}
      </div>
      <div className="flex flex-col w-[14.5625rem]">
        <input className="cursor-pointer py-2 mb-8 rounded-3xl flex bg-blue-default text-white-100" type='submit' value="완료"/>
      </div>
    </form>
  );
}
