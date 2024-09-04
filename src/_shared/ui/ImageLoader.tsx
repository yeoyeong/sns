import React, { CSSProperties, useMemo, useRef } from 'react';
import Image, { StaticImageData } from 'next/image';
import useOnScreen from '../lib/hooks/useOnScreen';

type Props = {
  src: string | StaticImageData;
  alt: string;
  width: number;
  height: number;
};
function ImageLoader({ src, alt, width, height }: Props) {
  const ref = useRef(null);
  const isVisible = useOnScreen(ref);
  const imageStyle: CSSProperties = useMemo(
    () => ({
      width: '430px',
      height: 'auto',
      objectFit: 'cover',
    }),
    []
  );

  return (
    <div ref={ref}>
      {isVisible && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          // placeholder='blur'
          // blurDataURL='/path-to-low-res-image.jpg' // optional: placeholder 이미지
          className='h-64 w-[430px] object-cover'
          style={imageStyle}
        />
      )}
    </div>
  );
}

export default ImageLoader;