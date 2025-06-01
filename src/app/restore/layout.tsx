import { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import MotionWrapper from "../../components/MotionWrapper";
import PageHeader from "../../components/PageHeader";
import SignUpProviders from "../../components/provider/SignUpProviders";

export const metadata: Metadata = {
  title: "한모 탈퇴복원",
  description: "한모 탈퇴복원 페이지",
};

export default function SignupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SignUpProviders>
      <PageHeader title="탈퇴복원" />
      <MotionWrapper>
        <Toaster position="top-center" reverseOrder={false} />
        {children}
      </MotionWrapper>
    </SignUpProviders>
  );
}
