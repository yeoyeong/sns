import { useEffect, useRef, useState } from 'react';

const useOutsideClick = () => {
  const [isOpen, setIsOpen] = useState(false);
  // prettier-ignore
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 모달 외부 클릭 감지 핸들러
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false); // 모달 닫기
      }
    };

    // 클릭 이벤트 리스너 추가
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsOpen]); // modalRef를 의존성 배열에 추가

  return {
    isOpen,
    setIsOpen,
    ref,
  };
};

export default useOutsideClick;
