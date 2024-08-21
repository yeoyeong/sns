import { useEffect, useRef } from 'react';

type Props = {
  children: React.ReactNode;
  setModalClose: () => void;
};
export function ModalLayout({ children, setModalClose }: Props) {
  // prettier-ignore
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 모달 외부 클릭 감지 핸들러
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setModalClose(); // 모달 닫기
      }
    };

    // 클릭 이벤트 리스너 추가
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setModalClose]); // modalRef를 의존성 배열에 추가

  return <div ref={modalRef}>{children}</div>;
}