import { CommentPayload } from '@/_features/comments/lib/types/commentsType';
import useCreateComments from '@/_features/comments/model/query/useCreateComments';
import { useInput } from '@/_features/i/model';
import { useRef, useState } from 'react';
import PostListCommentsList from './post-list.commentsList';

type Props = {
  post_id: number;
  commentsCount: number;
};

export default function PostListComments({
  post_id,
  commentsCount = 0,
}: Props) {
  const ref = useRef < HTMLInputElement > ({} as HTMLInputElement);
  const [isTyping, setIsTyping] = useState(false);
  const [isShowComments, setIsShowComments] = useState(false);
  const { createPostHandler } = useCreateComments();
  const { values, setValues, handleChange } = useInput({ comment: '' });

  const isInputHandler = async () => {
    await setIsTyping(true);
    if (ref.current !== null) ref.current.focus(); // input에 focus
  };

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
      {!isShowComments ? (
        <button
          type='button'
          className='text-gray-300'
          onClick={() => setIsShowComments(true)}>
          댓글 {commentsCount}개 모두 보기
        </button>
      ) : (
        <>
          <button
            type='button'
            className='text-gray-300'
            onClick={() => setIsShowComments(false)}>
            댓글 숨기기
          </button>
          <PostListCommentsList post_id={post_id} />
        </>
      )}
      {!isTyping ? (
        <button type='button' onClick={isInputHandler}>
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