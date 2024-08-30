import { useEffect, useRef } from 'react';
import { useInput } from '@/_features/i/model';
import usePatchComments from '../model/query/usePatchComments';
import CommentsReplay from './comments.replay';

type Props = {
  comment_content: string;
  comment_id: number;
  post_id: number;
  isEditMode: number | undefined;
  setIsEditMode: React.Dispatch<React.SetStateAction<number | undefined>>;
};
export default function CommentsReplayContents({
  comment_content,
  comment_id,
  post_id,
  isEditMode,
  setIsEditMode,
}: Props) {
  const inputRef =
    useRef < HTMLInputElement > (null as HTMLInputElement | null);
  const { createPostHandler } = usePatchComments();
  const { values, handleChange } = useInput({
    content: comment_content ?? '',
  });

  useEffect(() => {
    if (!isEditMode) return;
    inputRef.current?.focus();
  }, [isEditMode]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    if (!values.content.trim()) return;
    try {
      createPostHandler({ content: values.content, comment_id });
      setIsEditMode(undefined);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=''>
      {isEditMode === comment_id ? (
        <input
          type='text'
          name='content'
          value={values.content}
          onBlur={() => setIsEditMode(undefined)}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />
      ) : (
        <div>
          <p className='max-w-72 text-sm'>{comment_content}</p>

          <CommentsReplay comment_id={comment_id} post_id={post_id} />
        </div>
      )}
    </div>
  );
}