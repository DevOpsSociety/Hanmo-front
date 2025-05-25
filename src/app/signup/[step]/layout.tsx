import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import MotionWrapper from "../../../components/MotionWrapper";
import PageHeader from "../../../components/PageHeader";
import SignUpProviders from "../../../components/provider/SignUpProviders";

export const metadata: Metadata = {
  title: "한모 회원가입",
  description: "한모 회원가입 페이지",
};

export default function SignupLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { step: string; };
}>) {
  const title =
    params.step === "1" ? "회원가입" : params.step === "2" ? "정보입력" : "";

  return (
    <SignUpProviders>
      <PageHeader title={title} />
      <MotionWrapper>
        <Toaster position="top-center" reverseOrder={false} />
        {children}
      </MotionWrapper>
    </SignUpProviders>
  );
}
