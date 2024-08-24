// 'use client';

// import { useEffect, useState } from 'react';

// export default function WritePage() {
//   const [values, setValues] = useState(Array(10 * 5).fill(''));
//   const [isComposing, setIsComposing] = useState(false); // IME 조합 여부 상태 추가
//   const [composedValue, setComposedValue] = useState(''); // IME 조합 중인 값을 추적

//   const handleChange = (
//     index: number,
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const { value } = event.target;

//     const newValues = [...values];
//     newValues[index] = event.target.value;
//     setValues(newValues);

//     // IME 조합이 끝나고 포커스 이동 조건을 확인
//     if (!isComposing && value.length === 1 && index < values.length - 1) {
//       const nextInput = document.querySelector(
//         `input:nth-child(${index + 2})`
//       ) as HTMLInputElement;
//       if (nextInput) {
//         nextInput.focus();
//       }
//     }
//   };

//   const handleInput = (
//     index: number,
//     event: React.FormEvent<HTMLInputElement>
//   ) => {
//     const { value } = event.currentTarget;

//     if (!isComposing) {
//       const newValues = [...values];
//       newValues[index] = value;
//       setValues(newValues);
//     }
//   };

//   const handleCompositionStart = () => {
//     setIsComposing(true); // IME 입력 시작 시 true로 설정
//   };

//   const handleCompositionUpdate = (
//     event: React.CompositionEvent<HTMLInputElement>
//   ) => {
//     setComposedValue(event.data); // 현재 조합 중인 값을 저장
//   };

//   const handleCompositionEnd = (
//     index: number,
//     event: React.CompositionEvent<HTMLInputElement>
//   ) => {
//     setIsComposing(false);
//     const { value } = event.currentTarget;

//     // 조합이 끝난 후 포커스를 이동시키도록 함
//     // 조합 중 마지막으로 입력된 값과 조합이 끝난 값이 다를 때만 포커스를 이동
//     if (
//       value.length > 0 &&
//       composedValue === event.data &&
//       index < values.length - 1
//     ) {
//       const nextInput = document.querySelector(
//         `input:nth-child(${index + 2})`
//       ) as HTMLInputElement;
//       if (nextInput) {
//         nextInput.focus();
//       }
//     }
//     setComposedValue(''); // 조합 값 초기화
//   };

//   const handleKeyDown = (
//     index: number,
//     e: React.KeyboardEvent<HTMLInputElement>
//   ) => {
//     const rowSize = 10; // 한 줄에 10개의 input
//     let newIndex = index;

//     switch (e.key) {
//       case 'ArrowUp':
//         if (index >= rowSize) {
//           newIndex = index - rowSize;
//         }
//         break;
//       case 'ArrowDown':
//         if (index < values.length - rowSize) {
//           newIndex = index + rowSize;
//         }
//         break;
//       case 'ArrowLeft':
//         if (index % rowSize !== 0) {
//           newIndex = index - 1;
//         }
//         break;
//       case 'ArrowRight':
//         if (index % rowSize !== rowSize - 1) {
//           newIndex = index + 1;
//         }
//         break;
//       case ' ':
//       case 'Space':
//         e.preventDefault(); // 스페이스바 기본 동작 방지
//         if (index < values.length - 1) {
//           const newValues = [...values];
//           for (let i = values.length - 1; i > index; i -= 1) {
//             newValues[i] = newValues[i - 1];
//           }
//           newValues[index] = ''; // 현재 위치에 빈값을 넣음
//           setValues(newValues);

//           // 스페이스바를 누른 경우에만 포커스를 한 칸 뒤로 이동
//           newIndex = index + 1;
//         }
//         break;
//       default:
//         return; // 다른 키는 무시
//     }

//     // 포커스를 이동시키는 로직
//     if (newIndex !== index || e.key === ' ' || e.key === 'Space') {
//       const nextInput = document.querySelector(
//         `input:nth-child(${newIndex + 1})`
//       ) as HTMLInputElement;
//       if (nextInput) {
//         nextInput.focus();
//       }
//     }
//   };

//   useEffect(() => {
//     console.log(values);
//   }, [values]);
//   return (
//     <div className='mt-1 grid w-[361px] grid-cols-10 border-l border-t border-solid border-blue-300'>
//       {values.map((value, index) => (
//         <input
//           key={`key-${index.toString()}`}
//           type='text'
//           // maxLength={1}
//           value={value}
//           className='flex aspect-square w-9 items-center justify-center border-b border-r border-solid border-blue-300 text-center text-lg'
//           onChange={(event) => handleChange(index, event)}
//           onInput={(event) => handleInput(index, event)}
//           onKeyDown={(e) => handleKeyDown(index, e)} // 스페이스바 처리
//           onCompositionStart={handleCompositionStart} // IME 입력 시작 처리
//           onCompositionUpdate={handleCompositionUpdate}
//           onCompositionEnd={(event) => handleCompositionEnd(index, event)}
//         />
//       ))}
//     </div>
//   );
// }