import { useEffect, useRef, useState } from 'react';
import { useInput } from '@/_features/i/model';
import ArrowIcon from '@/_shared/asset/icon/arrow_icon.svg';
import usePatchComments from '../model/query/usePatchComments';
import CommentsReplay from './comments.replay';
import { Comment } from '../lib/types/commentsType';
import CommentsItem from './comments.item';

type Props = {
  comment_content: string;
  comment_id: number;
  post_id: number;
  replies: Comment[] | null;
  isEditMode: number | undefined;
  setIsEditMode: React.Dispatch<React.SetStateAction<number | undefined>>;
};
export default function CommentsContents({
  comment_content,
  comment_id,
  post_id,
  replies,
  isEditMode,
  setIsEditMode,
}: Props) {
  const inputRef =
    useRef < HTMLInputElement > (null as HTMLInputElement | null);
  const [isShowReplies, SetIsShowReplies] = useState(false);
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
          {!isShowReplies && replies && (
            <button
              className='flex items-center gap-1 text-sm text-gray-300'
              onClick={() => SetIsShowReplies(true)}
              type='button'>
              <ArrowIcon className='rotate-180' />
              답글 {replies.length}개
            </button>
          )}
          {isShowReplies && replies && (
            <>
              <button
                className='mb-1 flex items-center gap-1 text-sm text-gray-300'
                onClick={() => SetIsShowReplies(false)}
                type='button'>
                <ArrowIcon />
                답글 {replies.length}개
              </button>
              {replies.map(comment => (
                <CommentsItem
                  comment={comment}
                  post_id={post_id}
                  isReplay={true}
                />
              ))}
            </>
          )}
          <CommentsReplay comment_id={comment_id} post_id={post_id} />
        </div>
      )}
    </div>
  );
}