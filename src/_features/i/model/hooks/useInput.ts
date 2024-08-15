import { useState, useRef, useCallback, useEffect } from 'react';

// 제네릭 타입 T는 초기값의 타입을 나타내며, 모든 키는 숫자 또는 문자열이어야 합니다.
export default function useInput<T extends { [key: string]: number | string }>(initialValues: T) {
  // 초기값의 타입을 T로 설정하고, useState 훅의 타입을 정의합니다.
  const [values, setValues] = useState<T>(initialValues);

  // inputRefs는 HTMLInputElement 또는 null을 저장하는 배열입니다.
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  // register 함수는 ref를 등록합니다.
  const register = useCallback(
    (index: number) => (input: HTMLInputElement | null) => {
      inputRefs.current[index] = input;
    },
    []
  );

  // handleKeyDown 함수는 Enter 키를 눌렀을 때 다음 입력 필드로 포커스를 이동시킵니다.
  const handleKeyDown = useCallback(
    (index: number) => (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        const nextIndex = index + 1;
        if (nextIndex < inputRefs.current.length) {
          inputRefs.current[nextIndex]?.focus();
        }
      }
    },
    []
  );

  // handleChange 함수는 입력 필드의 값이 변경될 때 호출됩니다.
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    },
    []
  );

  useEffect(()=>{
    console.log(inputRefs.current)
    console.log(values)
  },[values, inputRefs])

  return {
    values,
    register,
    handleKeyDown,
    handleChange,
  };
}

