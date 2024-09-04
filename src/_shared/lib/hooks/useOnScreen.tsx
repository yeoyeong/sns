import { RefObject, useEffect, useState, useCallback } from 'react';

function useOnScreen(ref: RefObject<Element>) {
  const [isIntersecting, setIntersecting] = useState(false); // 초기값을 false로 설정

  // useCallback을 사용해 observerCallback을 메모이제이션
  const observerCallback = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      setIntersecting(entry.isIntersecting);
    },
    []
  );

  useEffect(() => {
    const currentElement = ref.current;

    const observer = new IntersectionObserver(observerCallback);

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [ref, observerCallback]); // observerCallback을 의존성 배열에 추가

  return isIntersecting;
}

export default useOnScreen;