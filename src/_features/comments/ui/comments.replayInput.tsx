import React, { useEffect, useRef } from 'react';
import { useInput } from '@/_features/i/model';
import { CommentPayload } from '../lib/types/commentsType';
import useCreateComments from '../model/query/useCreateComments';
import useTypingStore from '../lib/store/store';

type Props = {
  post_id: number;
  parent_id?: number | null;
  placeholder: string;
};

export function CommentsReplayInput({
  post_id,
  parent_id = null,
  placeholder,
}: Props) {
  const ref = useRef < HTMLInputElement > (null as HTMLInputElement | null);
  const { isTyping, setIsTyping } = useTypingStore();
  const { createPostHandler } = useCreateComments();
  const { values, setValues, handleChange } = useInput({ comment: '' });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || values.comment.trim() === '') return;
    e.preventDefault();
    const formData: CommentPayload = {
      content: values.comment,
      post_id,
      parent_id,
    };
    createPostHandler(formData);
    setValues({ comment: '' }); // 댓글 입력 후 인풋 초기화
    setIsTyping(null);
    console.log('?');
  };

  useEffect(() => {
    if (!isTyping) return;
    if (ref.current !== null) ref.current.focus(); // input에 focus
  }, [isTyping]);

  return (
    <input
      className='ml-[18px] mt-1 w-full'
      ref={ref}
      type='text'
      name='comment'
      onBlur={() => setIsTyping(null)}
      value={values.comment}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
    />
  );
}