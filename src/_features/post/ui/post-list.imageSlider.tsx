import Image, { StaticImageData } from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules'; // 모듈은 'swiper/modules'에서 import
import { v4 } from 'uuid';
import { CSSProperties, useMemo } from 'react';

type Props = {
  slideImages: string[] | StaticImageData[];
};
export default function ImageSlider({ slideImages }: Props) {
  const imageStyle: CSSProperties = useMemo(
    () => ({
      width: '430px',
      height: 'auto',
      objectFit: 'cover',
    }),
    []
  );

  return (
    <div className='flex items-center justify-center py-1'>
      <div className='w-[430px] overflow-hidden'>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          className='h-64 w-full'>
          {slideImages.map(slideImage => (
            <SwiperSlide
              key={v4()}
              className='flex items-center justify-center bg-gray-100'>
              <Image
                className='h-64 w-[430px] object-cover'
                style={imageStyle}
                src={slideImage}
                alt='포스트사진'
                width={430}
                height={64}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}