import { useGetPostData } from '@/_shared/model';
import Image from 'next/image';
import Link from 'next/link';
import default_img from '@/_shared/asset/post_default_image.webp';
import HeartIcon from '@/_shared/asset/icon/heart_icon.svg';
import UserInfoPostSkeleton from './UserInfo.PostSkeleton';

type Props = {
  userId: string;
};
export default function UserInfoPost({ userId }: Props) {
  const {
    data: posts,
    isSuccess,
    isLoading,
    ref,
  } = useGetPostData({ userId, queryKey: 'user_post', limit: 6 });

  if (isLoading) return <UserInfoPostSkeleton />;
  if (isSuccess) {
    return (
      <div className='mx-auto mt-10 grid w-1/2 gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {posts &&
          posts.map(post => (
            <Link
              key={post.id}
              href={`post/${post.id.toString()}`}
              className='group relative aspect-square'>
              <Image
                src={post.picture.length !== 0 ? post.picture[0] : default_img}
                layout='fill'
                objectFit='cover'
                alt={`${post.users.nickname}님의 포스트 사진`}
              />
              <ul className='bg-black-custom text-white-100 ease-in-out" absolute left-0 top-0 flex h-full w-full items-center justify-center gap-3 text-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                <li className='flex items-center gap-1'>
                  <HeartIcon
                    viewBox='0 0 24 24'
                    width='16px'
                    height='16px'
                    fill='white'
                  />
                  <p>{post.likesCount}</p>
                </li>
                <li className='flex gap-1'>
                  <p>댓글</p>
                  <p>{post.commentsCount}</p>
                </li>
              </ul>
            </Link>
          ))}
        <div ref={ref} className='h-[1px]' />
      </div>
    );
  }
}