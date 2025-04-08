import { notFound } from 'next/navigation';
import SignUpStepOne from '../../../components/signUp/SignUpStepOne';
import SignUpStepTwo from '../../../components/signUp/SignUpStepTwo';

export default function SignupPage({ params }: { params: { step: string } }) {
  const { step } = params;

  if (step === '1') return <SignUpStepOne />;
  if (step === '2') return <SignUpStepTwo />;

  return notFound(); // 404 페이지로
}
