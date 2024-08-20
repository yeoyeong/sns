'use client';

import back_arrow from '@/_shared/asset/back-arrow.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type Props = {
  username: string;
};

export default function HeaderUser({ username }: Props) {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };
  return (
    <div className='top relative flex w-full items-center justify-center border-b border-solid border-b-gray-400 pb-2 pt-2'>
      <button
        className='absolute left-2 top-1/2 -translate-y-1/2 transition'
        type='button'
        onClick={goBack}>
        <Image src={back_arrow} alt='뒤로가기 아이콘' width={16} />
      </button>
      <h3>{username}</h3>
    </div>
  );
}