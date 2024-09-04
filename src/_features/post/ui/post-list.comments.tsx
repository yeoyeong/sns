import { useState } from 'react';
import { CommentsInput } from '@/_features/comments/ui/comments.input';
import PostListCommentsList from './post-list.commentsList';

type Props = {
  post_id: number;
  commentsCount: number;
};

export default function PostListComments({
  post_id,
  commentsCount = 0,
}: Props) {
  const [isTyping, setIsTyping] = useState(false);
  const [isShowComments, setIsShowComments] = useState(false);

  const isInputHandler = () => {
    setIsTyping(true);
  };

  return (
    <div className='mt-2 flex w-[360px] flex-col items-start gap-1'>
      {!isShowComments ? (
        <button
          type='button'
          className='text-gray-400'
          onClick={() => setIsShowComments(true)}>
          댓글 {commentsCount}개 모두 보기
        </button>
      ) : (
        <>
          <button
            type='button'
            className='text-gray-400'
            onClick={() => setIsShowComments(false)}>
            댓글 숨기기
          </button>
          <PostListCommentsList post_id={post_id} />
        </>
      )}
      {!isTyping ? (
        <button type='button' onClick={isInputHandler} className='mt-1 pl-2'>
          댓글 달기 ...
        </button>
      ) : (
        <CommentsInput
          post_id={post_id}
          isTyping={isTyping}
          setIsTyping={setIsTyping}
          placeholder='댓글 입력 . . .'
        />
      )}
    </div>
  );
}