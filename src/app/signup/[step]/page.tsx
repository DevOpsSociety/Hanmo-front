"use client";

import { notFound } from 'next/navigation';
import SignUpStepOne from '../../../components/signUp/SignUpStepOne';
import SignUpStepTwo from '../../../components/signUp/SignUpStepTwo';
import { useAuthRedirect } from "../../../hooks/useAuthRedirect";

export default function SignupPage({ params }: { params: { step: string; }; }) {
  const { step } = params;

  useAuthRedirect('/main'); // 유효한 토큰이 있는지 확인하고 리다이렉트

  if (step === '1') return <SignUpStepOne />;
  if (step === '2') return <SignUpStepTwo />;

  return notFound(); // 404 페이지로
}
