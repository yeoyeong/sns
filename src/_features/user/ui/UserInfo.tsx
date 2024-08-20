import { UserData } from '@/_features/i/lib/types/user';
import Image from 'next/image';
import setting_icon from '@/_shared/asset/icon/setting_icon.png';
import user_icon from '@/_shared/asset/icon/header-user_icon.png';

type Props = {
  user: UserData;
  isMe: boolean;
};

export default function UserInfo({ user, isMe }: Props) {
  console.log(user);
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
                className='rounded-lg bg-gray-200 px-2 py-1 font-bold shadow-md'
                type='button'>
                팔로우
              </button>
            ) : (
              <button className='flex h-[32px] items-center' type='button'>
                <Image src={setting_icon} width={16} alt='설정 아이콘' />
              </button>
            )}
          </div>
        </div>
        <ul className='flex gap-5'>
          <li>
            <p>
              <span className='mr-1 font-bold'>게시물</span>0
            </p>
          </li>
          <li>
            <p>
              <span className='mr-1 font-bold'>팔로우</span>0
            </p>
          </li>
          <li>
            <p>
              <span className='mr-1 font-bold'>팔로워</span>0
            </p>
          </li>
        </ul>
        <p className='text-gray-300'>
          {user.oneLiner ? (
            <>{user.oneLiner}</>
          ) : (
            <>안녕하세요 {user.nickname}입니다.</>
          )}
        </p>
      </div>
    </div>
  );
}