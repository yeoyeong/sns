import { useAuthActions } from '@/_features/i/model';
import { ModalLayout } from '@/_shared/ui/layout/client-modal-layout';

type Props = {
  setModalClose: () => void;
};
export function UserInfoSetting({ setModalClose }: Props) {
  const { signOut } = useAuthActions();
  return (
    <ModalLayout setModalClose={setModalClose}>
      <ul className='absolute left-0 top-7 flex w-[200px] flex-col items-center justify-center rounded-2xl bg-gray-300'>
        <li className='w-full rounded-2xl'>
          <button
            className='border-white-100 w-full rounded-2xl border-b border-solid py-4 text-center'
            type='button'
            onClick={signOut}>
            로그아웃
          </button>
        </li>
      </ul>
    </ModalLayout>
  );
}