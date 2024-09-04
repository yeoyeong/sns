import React, { useEffect, useRef } from 'react';
import { useInput } from '@/_features/i/model';
import { CommentPayload } from '../lib/types/commentsType';
import useCreateComments from '../model/query/useCreateComments';

type Props = {
  post_id: number;
  parent_id?: number | null;
  isTyping: boolean;
  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>;
  placeholder: string;
};

export function CommentsInput({
  post_id,
  parent_id = null,
  isTyping,
  setIsTyping,
  placeholder,
}: Props) {
  const ref = useRef < HTMLInputElement > (null as HTMLInputElement | null);
  const { createPostHandler } = useCreateComments();
  const { values, setValues, handleChange } = useInput({ comment: '' });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || values.comment.trim() === '') return;
    e.preventDefault();
    // parent_id?: number | null;
    const formData: CommentPayload = {
      content: values.comment,
      post_id,
      parent_id,
    };
    createPostHandler(formData);
    setValues({ comment: '' }); // 댓글 입력 후 인풋 초기화
  };

  useEffect(() => {
    if (!isTyping) return;
    if (ref.current !== null) ref.current.focus(); // input에 focus
  }, [isTyping]);

  return (
    <input
      className='mt-1 w-full py-2 pl-2'
      ref={ref}
      type='text'
      name='comment'
      onBlur={() => setIsTyping(false)}
      value={values.comment}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
    />
  );
}