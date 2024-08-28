import { useAuthActions } from '@/_features/i/model';
import ClientModalLayout from '@/_shared/ui/layout/client-modal-layout';
import React from 'react';

function UserInfoSetting() {
  const { signOut } = useAuthActions();
  return (
    <ClientModalLayout>
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
    </ClientModalLayout>
  );
}

export default UserInfoSetting;