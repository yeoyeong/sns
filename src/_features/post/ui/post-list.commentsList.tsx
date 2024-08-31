import useGetComments from '@/_features/comments/model/query/useGetComments';
import CommentsItem from '@/_features/comments/ui/comments.item';

type Props = {
  post_id: number;
};

export default function PostListCommentsList({ post_id }: Props) {
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
          <CommentsItem key={comment.id} comment={comment} post_id={post_id} />
        ))}
      </ul>
    );
  }
}