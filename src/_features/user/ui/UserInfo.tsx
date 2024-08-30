'use client';

import { UserData } from '@/_features/i/lib/types/user';
import Image from 'next/image';
import setting_icon from '@/_shared/asset/icon/setting_icon.png';
import user_icon from '@/_shared/asset/icon/header-user_icon.png';
import useOutsideClick from '@/_shared/lib/hooks/useOutsideClick';
import useGetUserStats from '../model/query/useGetUserStats';
import usePostUserFollow from '../model/query/usePostUserFollow';
import UserInfoSetting from './UserInfo.setting';
import UserInfoPatch from './UserInfo.modal';
import UserInfoPost from './UserInfo.Post';
import { useUserStore } from '@/_shared/util/userStore';
import { userPageStore } from '../lib/types/store/store';
import { useEffect, useState } from 'react';

type Props = {
  userData: UserData;
};

export default function UserInfo({ userData }: Props) {
  const { user: myData } = useUserStore();
  const { user, setUser } = userPageStore();

  useEffect(() => {
    setUser(userData);
  }, []);

  const { data, isLoading } = useGetUserStats({ uid: userData.uid });

  const { followingHandler } = usePostUserFollow();
  const { isOpen, setIsOpen, ref } = useOutsideClick();
  const {
    isOpen: isOpenPatch,
    setIsOpen: setIsOpenPatch,
    ref: refPatch,
  } = useOutsideClick();

  const openUserPatchModal = () => {
    setIsOpenPatch(true);
    setIsOpen(false);
  };

  const isUserType = () => {
    if (myData?.uid !== user.uid) return false;
    return true;
  };

  if (!data || isLoading || !myData) {
    return null;
  }

  return (
    <div>
      <div className='flex justify-center gap-10 pt-16'>
        {isOpenPatch && (
          <div className='fixed z-10' ref={refPatch}>
            <UserInfoPatch onClose={() => setIsOpenPatch(false)} />
          </div>
        )}
        <div className='flex flex-col items-center gap-4'>
          <div className='h-[192px] w-[192px] overflow-hidden rounded-full border-2 border-solid border-gray-900'>
            {user.profileImg ? (
              <Image
                src={user.profileImg}
                width={192}
                height={192}
                alt='유저 아이콘'
                className='h-full w-full object-cover'
              />
            ) : (
              <Image
                src={user_icon}
                alt='유저 프로필 사진'
                width={192}
                height={192}
                className='h-full w-full object-cover'
              />
            )}
          </div>
          {!isUserType && (
            <button
              type='button'
              className='bg-blue-default text-white-100 rounded-full px-4 py-1'>
              메세지 보내기
            </button>
          )}
        </div>
        <div className='flex flex-col gap-8'>
          <div className='flex items-start gap-4'>
            <div>
              <p className='text-3xl font-bold leading-none'>{user.nickname}</p>
              <p className='text-sm leading-none text-gray-300'>
                {user.userId}
              </p>
            </div>
            <div>
              {!isUserType ? (
                <button
                  onClick={() =>
                    followingHandler({
                      followerId: myData.uid,
                      followingId: user.uid,
                    })
                  }
                  className='rounded-lg bg-gray-200 px-2 font-semibold shadow-md'
                  type='button'>
                  팔로우
                </button>
              ) : (
                <div className='relative' ref={ref}>
                  <button
                    className='flex h-[32px] items-center'
                    type='button'
                    onClick={() => setIsOpen(true)}>
                    <Image src={setting_icon} width={16} alt='설정 아이콘' />
                  </button>
                  {isOpen && (
                    <UserInfoSetting openUserPatchModal={openUserPatchModal} />
                  )}
                </div>
              )}
            </div>
          </div>
          <ul className='flex gap-5'>
            <li>
              <p>
                <span className='mr-1 font-bold'>게시물</span>
                {isLoading ? 0 : data.postCount}
              </p>
            </li>
            <li>
              <p>
                <span className='mr-1 font-bold'>팔로우</span>
                {isLoading ? 0 : data.followerCount}
              </p>
            </li>
            <li>
              <p>
                <span className='mr-1 font-bold'>팔로워</span>
                {isLoading ? 0 : data.followingCount}
              </p>
            </li>
          </ul>
          <p className='text-gray-300'>
            {user.oneLiner
              ? user.oneLiner
              : `안녕하세요 ${user.nickname}입니다.`}
          </p>
        </div>
      </div>
      <UserInfoPost userId={user.uid} />
    </div>
  );
}