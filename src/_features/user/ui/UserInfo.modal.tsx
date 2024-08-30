import ImodalLayout from '@/_shared/ui/layout/i-modal-layout';
import { UserData } from '@/_features/i/lib/types/user';
import React from 'react';
import ProfilePatch from './UserInfo.uesrPatch';

type Props = {
  onClose: () => void;
  user: UserData;
};
function UserInfoPatch({ user, onClose }: Props) {
  return (
    <ImodalLayout onClose={onClose}>
      <ProfilePatch onClose={onClose} user={user} />
    </ImodalLayout>
  );
}

export default UserInfoPatch;