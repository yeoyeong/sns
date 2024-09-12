import { StaticImageData } from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules'; // 모듈은 'swiper/modules'에서 import
import { v4 } from 'uuid';
import ImageLoader from '@/_shared/ui/ImageLoader';

type Props = {
  slideImages: string[] | StaticImageData[];
};
export default function ImageSlider({ slideImages }: Props) {
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
              <ImageLoader
                src={slideImage}
                alt='포스트사진'
                width={430}
                height={256}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}