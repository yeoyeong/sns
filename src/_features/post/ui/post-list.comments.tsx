import { CommentPayload } from '@/_features/comments/lib/types/commentsType';
import useCreateComments from '@/_features/comments/model/query/useCreateComments';
import { useInput } from '@/_features/i/model';
import { useEffect, useRef, useState } from 'react';

type Props = {
  post_id: number;
  commentsCount: number;
};

export default function PostListComments({
  post_id,
  commentsCount = 0,
}: Props) {
  const [isTyping, setIsTyping] = useState(false);
  const ref = useRef < HTMLInputElement > ({} as HTMLInputElement);
  const { createPostHandler } = useCreateComments();
  const { values, setValues, handleChange } = useInput({ comment: '' });
  const isInput = async () => {
    await setIsTyping(true);
    if (ref.current !== null) ref.current.focus(); // input에 focus
  };

  useEffect(() => {
    console.log(values);
  }, [values]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || values.comment.trim() === '') return;
    e.preventDefault();
    // post_id: number;
    // content: string;
    // parent_id?: number | null;
    // nickname: string;
    const formData: CommentPayload = {
      content: values.comment,
      post_id,
    };
    createPostHandler(formData);
    setValues({ comment: '' }); // 댓글 입력 후 인풋 초기화
  };

  return (
    <div className='mt-2 flex flex-col items-start gap-1'>
      <button type='button'>댓글 {commentsCount}개 모두 보기</button>
      {!isTyping ? (
        <button type='button' onClick={isInput}>
          댓글 달기 ...
        </button>
      ) : (
        <input
          ref={ref}
          type='text'
          name='comment'
          onBlur={() => setIsTyping(false)}
          value={values.comment}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder='댓글 입력 . . .'
        />
      )}
    </div>
  );
}