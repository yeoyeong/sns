// 'use client';

// import Photo from '@/_shared/asset/icon/photo_icon.svg';
// import CloseBtn from '@/_shared/asset/icon/close_btn-x.svg';
// import Image from 'next/image';
// import { useEffect, useState } from 'react';
// import { v4 as  uuidv4} from 'uuid';
// import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
// import writeStore from '../lib/store/store';



// export default function InputPhoto() {
//   const [showImages, setShowImages] = useState<string[]>([]);
//   const { picture, setPicture, deletePicture }= writeStore()
//   const [images, setImages] = useState<{id:string,src:string}[]>([]);

//   const handleOnDragEnd = (result:DropResult) => {
//     if (!result.destination) return;

//     const reorderedImages = Array.from(images);
//     const [removed] = reorderedImages.splice(result.source.index, 1);
//     reorderedImages.splice(result.destination.index, 0, removed);

//     setImages(reorderedImages);
//   };

//   useEffect(()=>{
//     setImages(showImages.map((image) => ({ id: uuidv4(), src: image })))
//   },[showImages])

  

//   // 저스탠드 사진 올리기
//   const updateImageFiles = (imageLists:File[]) => {
//       // 새 이미지 파일을 기존 파일 앞에 추가하고 5장 제한 적용
//       let newImageFiles = [...imageLists, ...picture];
//       if (newImageFiles.length > 5) {
//         newImageFiles = newImageFiles.slice(0, 5);
//       }
//       // 이미지 파일을 배열에 추가
//       setPicture(newImageFiles);
//   }
  
//   // 사진 여러장 미리보기
//   const updatePreviewImages = (imageLists:File[]) => {
//       let imageUrlLists = [...showImages];
//       // URL을 생성하여 미리보기 리스트에 추가
//       imageLists.forEach((file) => {
//         const currentImageUrl = URL.createObjectURL(file as Blob);
//         imageUrlLists.unshift(currentImageUrl);
//       });
//       // 5장 제한
//       if (imageUrlLists.length > 5) {
//         imageUrlLists = imageUrlLists.slice(0, 5);
//       }
//       setShowImages(imageUrlLists);
//   }

//   const imagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files) return;
//     const imageLists = Array.from(e.target.files);  // FileList를 배열로 변환

//     updateImageFiles(imageLists)
//     updatePreviewImages(imageLists)
    
//     e.target.value = '';
//   };

//   // // X버튼 클릭 시 이미지 삭제
//   const deleteImage = (index:number) => {
//     setShowImages(showImages.filter((_, idx) => index !== idx));
//     deletePicture(index);
//   };


//   return (
//     <div className='flex items-center gap-3'>
//       <div className='flex items-center justify-center w-14 aspect-square rounded-2xl border border-solid border-gray-500'>
//         <label htmlFor='photo' className='cursor-pointer'>
//           <Photo />
//           <p className='text-xs text-center'>{showImages.length}/5</p>
//         </label>
//         <input
//           className='hidden'
//           type='file'
//           multiple
//           id='photo'
//           accept='image/jpg, image/png, image/jpeg'
//           onChange={imagesChange}
//         />
//       </div>
//       <DragDropContext onDragEnd={handleOnDragEnd}>
//       <Droppable droppableId="images" direction="horizontal">
//         {(provided) => (
//           <div
//             ref={provided.innerRef}
//             {...provided.droppableProps}
//             className="grid grid-cols-5 gap-1"
//           >
//             {images.map((image, index) => (
//               <Draggable key={image.id} draggableId={image.id} index={index}>
//                 {(providedInner) => (
//                   <div
//                     ref={providedInner.innerRef}
//                     {...providedInner.draggableProps}
//                     {...providedInner.dragHandleProps}
//                     className="relative"
//                   >
//                     <div className="w-14 aspect-square overflow-hidden rounded-2xl">
//                       <Image
//                         className="h-full w-full object-cover"
//                         src={image.src}
//                         alt="미리보기 이미지"
//                         width={60}
//                         height={60}
//                       />
//                     </div>
//                     <button
//                       className='bg-gray-600 w-3 h-3 rounded-full absolute -top-1 -right-1.5 flex items-center justify-center'
//                       onClick={() => deleteImage(index)}
//                       type="button"
//                     >
//                       <CloseBtn className="w-full h-full" fill="white" />
//                       <p className="hidden">닫기 버튼</p>
//                     </button>
//                   </div>
//                 )}
//               </Draggable>
//             ))}
//             {provided.placeholder}
//           </div>
//         )}
//       </Droppable>
//     </DragDropContext>
//       {/* <div className='flex items-center gap-1'>
//         {showImages.map((image, index) => (
//           <div className='relative' key={v4()}>
//               <div className='w-14 aspect-square overflow-hidden rounded-2xl'>
//                 <Image  
//                   className='h-full w-full object-cover'
//                   src={image} 
//                   alt="미리보기 이미지" 
//                   width={60} 
//                   height={60}
//                   />
//               </div>
//               <button 
//                     className='bg-gray-600 w-3 h-3 rounded-full absolute -top-1 -right-1.5 flex items-center justify-center'
//                     onClick={() => deleteImage(index)}
//                     type="button"
//                     >
//                     <CloseBtn className="w-full h-full" fill="white" />
//                     <p className='hidden'>닫기 버튼</p>
//               </button>
//           </div>
//         ))}
//       </div> */}
//       </div>
//   );
// }


// // {/* <div className="p-8">
// //       <h1 className="text-2xl font-bold mb-4">Drag and Drop List</h1>
// //       <DragDropContext onDragEnd={handleOnDragEnd}>
// //         <Droppable droppableId="items">
// //           {(provided) => (
// //             <div
// //               {...provided.droppableProps}
// //               ref={provided.innerRef}
// //               className="space-y-2"
// //             >
// //               {items.map((item, index) => (
// //                 <Draggable key={item.id} draggableId={item.id} index={index}>
// //                   {(providedd) => (
// //                     <div
// //                       ref={providedd.innerRef}
// //                       {...providedd.draggableProps}
// //                       {...providedd.dragHandleProps}
// //                       className="p-4 bg-blue-500 text-white rounded-lg shadow-md cursor-pointer"
// //                     >
// //                       {item.content}
// //                     </div>
// //                   )}
// //                 </Draggable>
// //               ))}
// //               {provided.placeholder}
// //             </div>
// //           )}
// //         </Droppable>
// //       </DragDropContext>
// //     </div> */}
// //     // </div>