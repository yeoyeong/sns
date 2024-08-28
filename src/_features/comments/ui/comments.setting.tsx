import useOutsideClick from '@/_shared/lib/hooks/useOutsideClick';
import useDeleteComments from '../model/query/useDeleteComments';

type Props = {
  comment_id: number;
  setIsEditMode: React.Dispatch<React.SetStateAction<number | undefined>>;
};
export default function CommentsSetting({ comment_id, setIsEditMode }: Props) {
  const { onDelete } = useDeleteComments();
  const { isOpen, setIsOpen, ref } = useOutsideClick();

  const onEditMode = () => {
    setIsEditMode(comment_id);
    setIsOpen(false);
  };

  return (
    <div className='relative' ref={ref}>
      <button
        className='rotate-90'
        type='button'
        onClick={() => setIsOpen(prev => !prev)}>
        ...
      </button>
      {isOpen && (
        <ul className='bg-white-100 absolute flex w-14 flex-col items-center shadow-md'>
          <li className='w-full border-b border-solid border-gray-200 text-center'>
            <button
              type='button'
              className='w-full text-xs'
              onClick={onEditMode}>
              수정
            </button>
          </li>
          <li>
            <button
              className='w-full text-xs text-red-500'
              type='button'
              onClick={() => onDelete(comment_id, setIsOpen)}>
              삭제
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}