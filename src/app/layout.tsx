import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import '../_shared/styles/globals.css';
import '../_shared/styles/theme.css';

import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Provider from '@/_shared/util/ReactQueryProviders';

export const metadata: Metadata = {
  title: 'YEOYEONG-SNS',
  description: '일기 공유 서비스',
};

const sehwa = localFont({
  src: '../../public/fonts/Se-hwa.ttf',
  display: 'swap',
  style: 'normal',
  weight: '400',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko' className={sehwa.className}>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}