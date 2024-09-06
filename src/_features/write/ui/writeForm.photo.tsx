'use client';

import Photo from '@/_shared/asset/icon/photo_icon.svg';
import { useEffect, useState } from 'react';
import { v4 as  uuidv4} from 'uuid';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import writeStore from '../lib/store/store';
import { ImageFile } from '../lib/types/write';
import PhotoDraggableItem from './writeForm.photoDraggableItem';
import { validateFiles } from '../lib/validate';

type Props = {
  picture?:string[]
}
export default function InputPhoto({picture}:Props) {
  const { setPicture, deletePicture }= writeStore()
  const [images, setImages] = useState<ImageFile[]>([]);
  

  const handleOnDragEnd = (result:DropResult) => {
    if (!result.destination) return;

    const reorderedImages = Array.from(images);
    const [removed] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, removed);

    setImages(reorderedImages);
    setPicture(reorderedImages.map((image)=>image.file))
  };

  // // 저스탠드 사진 올리기
  const updateImageFiles = (imageLists:File[]) => {
      const fileList = images.map((image) => image.file);

      let newImageFiles = [...imageLists, ...fileList];
      newImageFiles = newImageFiles.slice(0, 5);
      // 이미지 파일을 배열에 추가
      setPicture(newImageFiles);
  }

  // 파일 첨부 가공
  const createImageObjects = (imageLists: (File | string)[]) => {
    return imageLists.map((image) => {
      if (typeof image === 'string') {
        return {
          id: uuidv4(),
          file: image,
          blob: image
        };
      }
  
      return {
        id: uuidv4(),
        file: image,
        blob: URL.createObjectURL(image as Blob)
      };
    });
  };
  
  // 5장 제한
  const limitToFiveImages = (newImages:ImageFile[], prevImages:ImageFile[]) => {
    const combinedImages = [...newImages, ...prevImages];
    return combinedImages.slice(0, 5); // 5장까지만 유지
  };
  

  // 체인지 함수
  const imagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const imageLists = Array.from(e.target.files);  // FileList를 배열로 변환

    // 유효성 검사 함수 호출
    const validFiles = validateFiles(imageLists);

    // 유효한 파일이 없으면 함수 종료
    if (validFiles.length === 0) {
      return;
    }

    setImages((prev) => {
      const newImages = createImageObjects(imageLists);
      return limitToFiveImages(newImages, prev);
    });
    updateImageFiles(imageLists)

    e.target.value = '';
  };

  // // X버튼 클릭 시 이미지 삭제
  const deleteImage = (index:number) => {
    // setShowImages(showImages.filter((_, idx) => index !== idx));
    setImages(prev=>prev.filter((_,idx)=> index !== idx))
    deletePicture(index);
  };


  useEffect(()=>{
    if(!picture) return;
    setImages(createImageObjects(picture))
    setPicture(picture)
  },[picture])
  
  useEffect(()=>{
    return ()=>{
      setPicture([])
    }
  },[])

  return (
    <div className='flex items-center gap-3'>
      <div className='flex items-center justify-center w-14 aspect-square rounded-2xl border border-solid border-gray-500'>
        <label htmlFor='photo' className='cursor-pointer'>
          <Photo />
          <p className='text-xs text-center'>{images.length}/5</p>
        </label>
        <input
          className='hidden'
          type='file'
          multiple
          id='photo'
          accept='image/jpg, image/png, image/jpeg'
          onChange={imagesChange}
        />
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="images" direction="horizontal">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="grid grid-cols-5 gap-1"
          >
            {images.map((image, index) => (
              <PhotoDraggableItem key={image.id} id={image.id} index={index} onDelete={deleteImage} src={image.blob}/>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
      </div>
  );
}

// <Draggable key={image.id} draggableId={image.id} index={index}>
              //   {(providedInner) => (
              //     <div
              //       ref={providedInner.innerRef}
              //       {...providedInner.draggableProps}
              //       {...providedInner.dragHandleProps}
              //       className="relative"
              //     >
              //       <div className="w-14 aspect-square overflow-hidden rounded-2xl">
              //         <Image
              //           className="h-full w-full object-cover"
              //           src={image.blob}
              //           alt="미리보기 이미지"
              //           width={60}
              //           height={60}
              //         />
              //       </div>
              //       <button
              //         className='bg-gray-600 w-3 h-3 rounded-full absolute -top-1 -right-1.5 flex items-center justify-center'
              //         onClick={() => deleteImage(index)}
              //         type="button"
              //       >
              //         <CloseBtn className="w-full h-full" fill="white" />
              //         <p className="hidden">닫기 버튼</p>
              //       </button>
              //     </div>
              //   )}
              // </Draggable>