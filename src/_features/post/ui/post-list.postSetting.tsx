import ClientModalLayout from '@/_shared/ui/layout/client-modal-layout';
import Link from 'next/link';
import useDeletePost from '../model/useDeletePost';

type Props = {
  postId: number;
};
export default function PostSetting({ postId }: Props) {
  const { deletePostHandler } = useDeletePost();
  return (
    <ClientModalLayout>
      <ul className='absolute left-0 top-7 z-10 flex w-[100px] flex-col items-center justify-center rounded-2xl bg-gray-300'>
        <li className='w-full'>
          <Link
            className='border-white-100 block w-full border-b border-solid py-2 text-center text-xs'
            href={`/post/edit/${postId.toString()}`}
            // onClick={openUserPatchModal}
          >
            수정
          </Link>
        </li>
        <li className='w-full rounded-2xl'>
          <button
            className='border-white-100 w-full rounded-2xl border-b border-solid py-2 text-center text-xs text-red-500'
            type='button'
            onClick={() => deletePostHandler({ postId })}>
            삭제
          </button>
        </li>
      </ul>
    </ClientModalLayout>
  );
}