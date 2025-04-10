import PageHeader from '../../components/PageHeader';
import { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import MotionWrapper from '../../components/MotionWrapper';

export const metadata: Metadata = {
  title: '한모 로그인',
  description: '한모 로그인 페이지',
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body style={{ overflow: 'hidden' }}>
        <PageHeader title='로그인' />
        <MotionWrapper>
          <Toaster position='bottom-center' reverseOrder={false} />;{children}
        </MotionWrapper>
      </body>
    </html>
  );
}
