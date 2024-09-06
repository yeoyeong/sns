
import Link from 'next/link';
import { useState } from 'react';
import { useUserStore } from '@/_shared/util/userStore';
import UserIcon from '@/_widget/user/UserIcon';
import { Comment } from '../lib/types/commentsType';
import CommentsSetting from './comments.setting';
import useTypingStore from '../lib/store/store';
import CommentsContents from './comments.contents';




type Props = {
  comment: Comment;
  post_id:number;
  isReplay?:boolean
};
export default function CommentsItem({ comment, post_id, isReplay = false }: Props) {
    const { user } = useUserStore();
  const { isTyping, setIsTyping } = useTypingStore();

  const [isEditMode, setIsEditMode] = useState<number|undefined>();
  
  return (
    <li className='flex flex-col w-[430px] ' key={comment.id}>
        <div className='flex justify-between items-center'>
        <Link href={`/${comment.users.userId}`} className='flex items-center gap-1'>
            <div className='block h-[14px] w-[14px] overflow-hidden rounded-full'>
                <UserIcon profileImg={comment.users.profileImg} />
            </div>
            <p className='text-lg font-bold'>{comment.users.nickname}</p>
        </Link>
        <div className='flex gap-2'>
            {!isReplay && isTyping !== comment.id && (
                <button
                type='button'
                className='text-sm'
                onClick={() => setIsTyping(comment.id)}>
                답글
                </button>
            )}
            {user?.uid === comment.user_id && (
                <CommentsSetting
                comment_id={comment.id}
                setIsEditMode={setIsEditMode}
                />
            )}
        </div>
        </div>
        <div className='ml-[18px] flex justify-between'>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
            <CommentsContents
                isEditMode={isEditMode}
                comment_id={comment.id}
                comment_content={comment.content}
                setIsEditMode={setIsEditMode}
                post_id={post_id}
                replies={comment.replies}
            />
            
        </div>
    </li>
  );
}