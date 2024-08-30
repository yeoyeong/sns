import Image from 'next/image';
import user_icon from '@/_shared/asset/icon/header-user_icon.png';

type Props = {
  profileImg: string;
};

export default function UserIcon({ profileImg }: Props) {
  return (
    <>
      {profileImg ? (
        <Image
          src={profileImg}
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
    </>
  );
}