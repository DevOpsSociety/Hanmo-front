import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import PageHeader from '../../components/pageHeader';

export const metadata: Metadata = {
  title: '회원탈퇴',
  description: '회원탈퇴 페이지',
};

export default function withdrawLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <Toaster position='bottom-center' reverseOrder={false} />
        <PageHeader title='회원탈퇴' />
        {children}
      </body>
    </html>
  );
}
