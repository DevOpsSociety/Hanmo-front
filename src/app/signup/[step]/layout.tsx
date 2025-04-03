import type { Metadata } from 'next';
import SignUpProviders from '../../../components/provider/SignUpProviders';
import { Toaster } from 'react-hot-toast';
import PageHeader from '../../../components/pageHeader';

export const metadata: Metadata = {
  title: '회원가입',
  description: '회원가입 페이지',
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
      <body className='mx-auto'>
        <SignUpProviders>
          <Toaster position='bottom-center' reverseOrder={false} />
          <PageHeader title={title} />
          {children}
        </SignUpProviders>
      </body>
    </html>
  );
}
