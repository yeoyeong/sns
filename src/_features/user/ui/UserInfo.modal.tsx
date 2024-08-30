import ImodalLayout from '@/_shared/ui/layout/i-modal-layout';
import React from 'react';
import ProfilePatch from './UserInfo.uesrPatch';

type Props = {
  onClose: () => void;
};
function UserInfoPatch({ onClose }: Props) {
  return (
    <ImodalLayout onClose={onClose}>
      <ProfilePatch onClose={onClose} />
    </ImodalLayout>
  );
}

export default UserInfoPatch;