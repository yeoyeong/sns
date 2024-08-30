import { useEffect } from 'react';
import useTypingStore from '../lib/store/store';
import { CommentsReplayInput } from './comments.replayInput';

type Props = {
  comment_id: number;
  post_id: number;
};
export default function CommentsReplay({ post_id, comment_id }: Props) {
  const { isTyping } = useTypingStore();

  useEffect(() => {
    console.log(isTyping);
  }, [isTyping]);
  return (
    <div>
      {isTyping === comment_id && (
        <CommentsReplayInput
          post_id={post_id}
          parent_id={comment_id}
          placeholder='답글 입력 . . .'
        />
      )}
    </div>
  );
}