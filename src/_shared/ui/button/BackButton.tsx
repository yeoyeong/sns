'use client';

import arrow from '@/_shared/asset/back-arrow.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type Props = {
  onClose?: () => void;
};
export default function BackButton({ onClose }: Props) {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <div className='w-8/12 pb-4'>
      <button type='button' onClick={onClose || goBack}>
        <Image src={arrow} alt='뒤로가기 버튼' width={23} />
      </button>
    </div>
  );
}