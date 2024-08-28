import React from 'react';

type Props = {
  children: React.ReactNode;
};
function ModalLayout({ children }: Props) {
  return <div>{children}</div>;
}

export default ModalLayout;