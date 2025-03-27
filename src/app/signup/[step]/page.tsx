import { notFound } from 'next/navigation';
import SignUpStepOne from '../../../components/sign-up/SignUpStepOne';
import SignUpStepTwo from '../../../components/sign-up/SignUpStepTwo';

export default function SignupPage({ params }: { params: { step: string } }) {
  const { step } = params;

  if (step === '1') return <SignUpStepOne />;
  if (step === '2') return <SignUpStepTwo />;

  return notFound(); // 404 페이지로
}
