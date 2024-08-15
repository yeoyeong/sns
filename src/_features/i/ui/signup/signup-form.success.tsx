import { useRouter } from 'next/navigation';

export default function SignupSuccess() {
  const router = useRouter();

  const handleNavigateToSecondModal = () => {
    router.back(); // 현재 모달을 닫음
    router.push('/i/login'); // 새로운 모달로 이동
  };

  return (
    <div className='flex h-full flex-col justify-between pt-48'>
      <p className='text-center text-2xl font-bold text-gray-400'>
        회원가입 완료
      </p>
      <div className='flex w-[14.5625rem] flex-col gap-1'>
        <button
          className='bg-blue-default text-white-100 mb-8 cursor-pointer rounded-3xl py-4 text-center'
          type='button'
          onClick={handleNavigateToSecondModal}>
          로그인하러 가기
        </button>
      </div>
    </div>
  );
}