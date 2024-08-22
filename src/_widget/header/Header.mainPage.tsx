import Link from 'next/link';
import alarm_icon from '@/_shared/asset/icon/header-alarm_icon.png';
import message_icon from '@/_shared/asset/icon/message_icon.png';
import user_icon from '@/_shared/asset/icon/header-user_icon.png';
import SearchIcon from '@/_shared/asset/icon/search_icon.svg';
import logo from '@/_shared/asset/logo/logo.png';
import Image from 'next/image';
import { useState } from 'react';
import { UserData } from '@/_features/i/lib/types/user';

type Props = {
  user: UserData;
};

export default function HeaderMain({ user }: Props) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className='flex w-full flex-col items-center justify-center gap-10 pt-10'>
      <div>
        <Link href='/'>
          <Image src={logo} alt='사이트 로고' width={126} height={29} />
        </Link>
      </div>
      <nav className='flex w-full items-center justify-center'>
        <div className='relative mr-14'>
          <input
            className='focus:outline-skyblue-100 h-10 min-w-[215px] rounded-full border pl-9 transition-all duration-100 placeholder:text-gray-200 focus:pl-3 focus:outline-4'
            placeholder='검색'
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          {!isFocused && (
            <div className='absolute left-3 top-1/2 -translate-y-1/2 transform'>
              <SearchIcon />
            </div>
          )}
        </div>
        <ul className='flex gap-3'>
          <li>
            <button type='button'>
              {/* TODO: 알림 모달창 on */}
              <Image src={alarm_icon} alt='알림 아이콘' />
            </button>
          </li>
          <li>
            <button type='button'>
              {/* TODO: 채팅 모달창 on */}
              <Image src={message_icon} alt='메세지 아이콘' />
            </button>
          </li>
          <li>
            <Link
              href={`/${user.userId}`}
              className='block h-[27px] w-[27px] overflow-hidden rounded-full'>
              {user.profileImg ? (
                <Image
                  src={user.profileImg}
                  width={27}
                  height={27}
                  alt='유저 아이콘'
                  className='h-full w-full object-cover'
                />
              ) : (
                <Image
                  src={user_icon}
                  width={27}
                  height={27}
                  alt='유저 아이콘'
                  className='h-full w-full object-cover'
                />
              )}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}