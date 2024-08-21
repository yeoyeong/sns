'use client';

import { useState } from 'react';
import { UserData } from '@/_features/i/lib/types/user';
import Image from 'next/image';
import setting_icon from '@/_shared/asset/icon/setting_icon.png';
import user_icon from '@/_shared/asset/icon/header-user_icon.png';
import useGetUserStats from '../model/query/useGetUserStats';
import usePostUserFollow from '../model/query/usePostUserFollow';
import { UserInfoSetting } from './UserInfo.setting';

type Props = {
  user: UserData;
  isMe: boolean;
  myid: string;
};

export default function UserInfo({ user, isMe, myid }: Props) {
  const { data, isLoading } = useGetUserStats({ uid: user.uid });
  const { followingHandler } = usePostUserFollow();
  const [isSettingOn, setIsSettingOn] = useState(false);

  return (
    <div className='flex justify-center gap-10 pt-16'>
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
        {!isMe && (
          <button
            type='button'
            className='bg-blue-default text-white-100 rounded-full px-4 py-2'>
            메세지 보내기
          </button>
        )}
      </div>
      <div className='flex flex-col gap-8'>
        <div className='flex items-start gap-2'>
          <div>
            <p className='text-3xl font-bold leading-none'>{user.userId}</p>
            <p className='text-sm leading-none text-gray-300'>
              {user.nickname}
            </p>
          </div>
          <div>
            {!isMe ? (
              <button
                onClick={() =>
                  followingHandler({ followerId: myid, followingId: user.uid })
                }
                className='rounded-lg bg-gray-200 px-2 py-1 font-bold shadow-md'
                type='button'>
                팔로우
              </button>
            ) : (
              <div className='relative'>
                <button
                  className='flex h-[32px] items-center'
                  type='button'
                  onClick={() => setIsSettingOn((prev: boolean) => !prev)}>
                  <Image src={setting_icon} width={16} alt='설정 아이콘' />
                </button>
                {isSettingOn && <UserInfoSetting />}
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
          {user.oneLiner ? user.oneLiner : `안녕하세요 ${user.nickname}입니다.`}
        </p>
      </div>
    </div>
  );
}