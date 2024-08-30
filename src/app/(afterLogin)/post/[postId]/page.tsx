import { PostCard } from '@/_features/post';

type Props = {
  params: {
    postId: string;
  };
};
export default function PostPage({ params }: Props) {
  const { postId } = params;
  return <div>{postId}</div>;
}