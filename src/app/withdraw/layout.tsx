import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import PageHeader from '../../components/PageHeader';
import MotionWrapper from '../../components/MotionWrapper';

export const metadata: Metadata = {
  title: '한모 회원탈퇴',
  description: '한모 회원탈퇴 페이지',
};

export default function withdrawLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body style={{ overflow: 'hidden' }}>
        <PageHeader title='회원탈퇴' />
        <MotionWrapper>
          <Toaster position='bottom-center' reverseOrder={false} />;{children}
        </MotionWrapper>
      </body>
    </html>
  );
}
