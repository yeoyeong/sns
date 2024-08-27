import { useCallback, useEffect, useRef } from 'react';

type IntersectHandler = (
  entry: IntersectionObserverEntry,
  observer: IntersectionObserver
) => void;

const useIntersect = (
  onIntersect: IntersectHandler, // 요소가 교차할 때 실행될 콜백 함수
  options?: IntersectionObserverInit // IntersectionObserver의 옵션 (root, rootMargin, threshold 등)
) => {
  // 관찰할 DOM 요소를 참조하기 위한 ref 설정
  const ref = useRef(null);

  // IntersectionObserver의 콜백 함수 정의
  const callback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      // 관찰 대상 목록을 순회하며
      entries.forEach((entry) => {
        // 대상이 화면에 보이면 onIntersect 콜백 함수 실행
        if (entry.isIntersecting) onIntersect(entry, observer);
      });
    },
    [onIntersect] // onIntersect가 변경될 때만 이 콜백을 재생성
  );

  // ref가 설정된 DOM 요소가 존재하면 IntersectionObserver를 생성하고 관찰 시작
  useEffect(() => {
    if (!ref.current) return undefined;

    const observer = new IntersectionObserver(callback, options);
    observer.observe(ref.current); // ref가 가리키는 DOM 요소를 관찰

    // 컴포넌트 언마운트 시 관찰 중지
    return () => observer.disconnect();
  }, [ref, options, callback]);

  return ref;
};

export default useIntersect;