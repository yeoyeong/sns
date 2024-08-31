import Link from 'next/link';
import default_img from '@/_shared/asset/post_default_image.webp';
import PostListDate from './post-list.date';
import ImageSlider from './post-list.imageSlider';
import PostListContent from './post-list.content';

type Props = {
  content: string;
  picture: string[];
  weather: string;
  createdAt: string;
  postId: number;
};

export default function PostListItem({
  content,
  picture,
  weather,
  createdAt,
  postId,
}: Props) {
  return (
    <>
      <Link href={`/post/${postId}`}>
        <div className='card-grid grid w-[430px] items-center border border-solid border-blue-300'>
          <p className='flex h-9 items-center justify-center border-r border-solid border-blue-300'>
            날짜
          </p>

          <PostListDate createdAt={createdAt} />
          <p className='flex h-9 items-center justify-center border-l border-r border-solid border-blue-300'>
            날씨
          </p>
          <p className='text-center'>{weather}</p>
        </div>
      </Link>
      <ImageSlider slideImages={picture.length > 0 ? picture : [default_img]} />
      <PostListContent content={content} />
    </>
  );
}