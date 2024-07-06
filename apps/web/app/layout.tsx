import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { ClientSessionProvider } from '@/components/Providers/ClientSessionProvider';
import { Header } from '@/components/Header/Header';
const pretendard = localFont({
  src: [
    {
      path: '../public/fonts/PretendardVariable.woff2',
    },
  ],
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'SFACLOG',
  description: '스팩로그에서 성장의 길을 열어 보세요',
  openGraph: {
    title: 'SFACLOG',
    description: '스팩로그에서 성장의 길을 열어 보세요',
    images: '../public/images/metadata-image.png',
  },
  twitter: {
    site: '@SFACLOG',
    title: 'SFACLOG',
    description: '스팩로그에서 성장의 길을 열어 보세요',
    images: '../public/images/metadata-image.png',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <body className={`${pretendard.variable} font-pretendard`}>
        {children}
      </body>
    </html>
  );
}
