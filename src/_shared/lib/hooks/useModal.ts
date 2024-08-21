import { useState } from 'react';

export default function useModal() {
  const [modalState, setModalState] = useState(false);

  return {
    modalState,
    setModalState: () => setModalState((prev) => !prev),
    setModalClose: () => setModalState(false),
  };
}

