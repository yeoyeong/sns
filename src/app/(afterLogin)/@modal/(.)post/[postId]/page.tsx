import PostDetail from '@/_features/post/ui/post-detail';
import DetailModalLayout from '@/_features/post/ui/post-detail.modal-layout';

export default function PostPage() {
  return (
    <DetailModalLayout>
      <div className='flex justify-center'>
        <PostDetail />
      </div>
    </DetailModalLayout>
  );
}