import { useState } from 'react';

export default function useModal() {
  const [modalState, setModalState] = useState(false);

  return {
    modalState,
    // setModalOn: () => setModalState((prev) => !prev),
    setModalOn: () => setModalState(true),
    setModalClose: () => setModalState(false),
  };
}

