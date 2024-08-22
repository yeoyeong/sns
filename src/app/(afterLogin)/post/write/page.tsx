'use client';

import React, { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function WritePage() {
  const [contentArray, setContentArray] = useState(Array(50).fill(''));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]); // 배열을 사용할 수 있도록 타입 지정

    const handleChange = (index:number, value:string) => {
      const newArray = [...contentArray];
      newArray[index] = value;
      setContentArray(newArray);

      if (value.length === 1 && index < contentArray.length - 1) {
            // 다음 입력 필드가 존재하고 null이 아닌 경우에만 포커스 이동
            const nextInput = inputRefs.current[index + 1];
            console.log(nextInput)
            if (nextInput) nextInput.focus();
        };
    }

  return (
    <div className='mt-1 grid w-[361px] grid-cols-10 border-l border-t border-solid border-blue-300'>
      {contentArray.map((char, index) => (
        <input
          type='text'
          id={index.toString()}
          className='flex aspect-square w-9 items-center justify-center border-b border-r border-solid border-blue-300 text-center text-lg'
          key={uuidv4()}
          value={char}
          onChange={(e) => handleChange(index, e.target.value)}
          ref={(el) => {
            inputRefs.current[index] = el; // ref에 값을 할당, 반환값 없음
          }}
        />
      ))}
    </div>
  );
}