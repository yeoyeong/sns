import ImageSliderSkeleton from './post-list.imageSliderSkeleton';

export default function PostListItemSkeleton() {
  return (
    <>
      <div>
        <div className='card-grid grid w-[430px] items-center gap-3'>
          <p className='skeleton flex h-9 items-center justify-center rounded-md text-transparent'>
            날짜
          </p>

          {/* <PostListDate createdAt={createdAt} /> */}
          <p className='skeleton flex h-9 items-center justify-center rounded-md text-transparent'>
            날씨
          </p>
          <p className='skeleton h-9 rounded-md text-center text-transparent'>
            날씨
          </p>
        </div>
      </div>
      <ImageSliderSkeleton />
      {/* <ImageSlider slideImages={picture.length > 0 ? picture : [default_img]} /> */}
      {/* <PostListContent content={content} /> */}
    </>
  );
}