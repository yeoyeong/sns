import useGetComments from '@/_features/comments/model/query/useGetComments';
import CommentsEdit from '@/_features/comments/ui/comments.edit';
import CommentsSetting from '@/_features/comments/ui/comments.setting';
import { useUserStore } from '@/_shared/util/userStore';
import Link from 'next/link';
import { useState } from 'react';

type Props = {
  post_id: number;
};

export default function PostListCommentsList({ post_id }: Props) {
  const { user } = useUserStore();
  const [isEditMode, setIsEditMode] = useState<number|undefined>();
  const { data: comments, isLoading, isSuccess } = useGetComments({ post_id });

  if (isLoading) {
    <ul>
      <li>로딩중</li>
    </ul>;
  }

  if (isSuccess) {
    return (
      <ul>
        {comments.map(comment => (
          <li className='flex gap-4' key={comment.id}>
            <Link href={`/${comment.userId}`}>
              <p className='font-bold'>{comment.nickname}</p>
            </Link>
            <CommentsEdit 
              isEditMode={isEditMode} 
              comment_id={comment.id} 
              comment_content={comment.content} 
              setIsEditMode={setIsEditMode} 
            />
            {user?.uid === comment.user_id && (
              <CommentsSetting
                comment_id={comment.id}
                setIsEditMode={setIsEditMode}
              />
            )}
          </li>
        ))}
      </ul>
    );
  }
}