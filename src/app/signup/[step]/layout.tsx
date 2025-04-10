import type { Metadata } from 'next';
import SignUpProviders from '../../../components/provider/SignUpProviders';
import { Toaster } from 'react-hot-toast';
import PageHeader from '../../../components/PageHeader';
import MotionWrapper from '../../../components/MotionWrapper';

export const metadata: Metadata = {
  title: '한모 회원가입',
  description: '한모 회원가입 페이지',
};

export default function SignupLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { step: string };
}>) {
  const title =
    params.step === '1' ? '회원가입' : params.step === '2' ? '정보입력' : '';

  return (
    <html lang='en'>
      <body>
        <SignUpProviders>
          <PageHeader title={title} />
          <MotionWrapper>
            <Toaster position='bottom-center' reverseOrder={false} />;{children}
          </MotionWrapper>
        </SignUpProviders>
      </body>
    </html>
  );
}
