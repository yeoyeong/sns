import Image from 'next/image';
import CloseBtn from '@/_shared/asset/icon/close_btn-x.svg';
import { Draggable } from 'react-beautiful-dnd';

type Props = {
  id: string;
  src: string;
  index: number;
  onDelete: (index: number) => void;
};

export default function PhotoDraggableItem({
  id,
  src,
  index,
  onDelete,
}: Props) {
  return (
    <Draggable draggableId={id} index={index}>
      {providedInner => (
        <div
          ref={providedInner.innerRef}
          {...providedInner.draggableProps}
          {...providedInner.dragHandleProps}
          className='relative'>
          <div className='aspect-square w-[57px] overflow-hidden rounded-2xl'>
            <Image
              className='h-full w-full object-cover'
              src={src}
              alt='미리보기 이미지'
              width={57}
              height={57}
            />
          </div>
          <button
            className='absolute -right-1.5 -top-1 flex h-3 w-3 items-center justify-center rounded-full bg-gray-600'
            onClick={() => onDelete(index)}
            type='button'>
            <CloseBtn className='h-full w-full' fill='white' />
            <p className='hidden'>닫기 버튼</p>
          </button>
        </div>
      )}
    </Draggable>
  );
}