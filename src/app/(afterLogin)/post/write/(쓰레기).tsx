// 'use client';

// import React, { useCallback, useEffect, useRef, useState } from 'react';
// import { v4 as uuidv4 } from 'uuid';

// export default function WritePage() {
//   const [contentArray, setContentArray] = useState(Array(50).fill(''));
//     const inputRefs = useRef<(HTMLInputElement | null)[]>([]); // 배열을 사용할 수 있도록 타입 지정
//     const [currentIndex, setCurrentIndex] = useState(0); // 현재 포커스할 인덱스를 관리
//     const isComposing = useRef(false); // 한글 조합 상태 추적

//     useEffect(() => {
//         if (inputRefs.current[currentIndex]) {
//           inputRefs.current[currentIndex]?.focus(); // 포커스 설정
//         }
//       }, [currentIndex]); // currentIndex가 변경될 때마다 포커스 이동
    
//     useEffect(()=>{console.log(contentArray)},[contentArray])


//     const handleChange = useCallback((index:number, value:string)=>{
//         if (isComposing.current) return;
//         const newArray = [...contentArray];
//         setContentArray(newArray);

//           if (index < contentArray.length - 1 && value !== '' ) {
//             newArray[index] = value;    
//             setCurrentIndex(index + 1); // 다음 인덱스로 이동
//         }
//     },[contentArray])


//     //   const handleChange = (index, value) => {

//     //       const newArray = [...contentArray];
//     //       newArray[index] = value;
//     //       setContentArray(newArray);
    
//     //       if (index < contentArray.length - 1 && value !== '') {
//     //         setCurrentIndex(index + 1); // 다음 인덱스로 이동
//     //       }
//     //   };
    
//       const handleKeyDown = (index:number, e:React.KeyboardEvent<HTMLInputElement>) => {
//         if (e.nativeEvent.isComposing) {
//             e.stopPropagation();
//         }

//         if (e.key === ' ') {
//           e.preventDefault(); // 스페이스바의 기본 동작 방지
//           const newArray = [...contentArray];
    
//           // 현재 인덱스부터 뒤로 한 칸씩 밀기
//           for (let i = contentArray.length - 1; i > index; i--) {
//             newArray[i] = newArray[i - 1];
//           }
    
//           newArray[index] = ''; // 현재 인덱스는 비워둠
//           setContentArray(newArray);
//           setCurrentIndex(index + 1); // 다음 인덱스로 포커스 이동
//         }
//       };

//       const handleCompositionStart = () => {
//         isComposing.current = true; // 한글 조합 시작
//       };
    
//       const handleCompositionEnd = (index: number, e: React.CompositionEvent<HTMLInputElement>) => {
//         isComposing.current = false; // 한글 조합 완료
//         const inputElement = e.currentTarget as HTMLInputElement;
//         const value = inputElement.value;
    
//         const newArray = [...contentArray];
//         newArray[index] = value;
//         setContentArray(newArray);
    
//         // 조합 완료 후에만 포커스를 이동
//     if (index < contentArray.length - 1 && value.length > 0) {
//         setCurrentIndex(index + 1);
//       }
//       };

//   return (
//     <div className='mt-1 grid w-[361px] grid-cols-10 border-l border-t border-solid border-blue-300'>
//       {contentArray.map((char, index) => (
//         <input
//           type='text'
//           id={index.toString()}
//           className='flex aspect-quare w-9 items-center justify-center border-b border-r border-solid border-blue-300 text-center text-lg'
//           maxLength={1}
//           key={`key-${index.toString()}`}
//           defaultValue={char}
//           onChange={(e) => handleChange(index, e.target.value)}
//           onKeyDown={(e) => handleKeyDown(index, e)} // 스페이스바 처리
//           onCompositionStart={handleCompositionStart} // 한글 조합 시작
//           onCompositionEnd={(e) => handleCompositionEnd(index, e)} // 한글 조합 완료
//           ref={(el) => {
//             inputRefs.current[index] = el;
//           }}
//         />
//       ))}
//     </div>
//   );
// }