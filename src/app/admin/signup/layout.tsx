import { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import MotionWrapper from "../../../components/MotionWrapper";
import PageHeader from "../../../components/PageHeader";
import SignUpProviders from "../../../components/provider/SignUpProviders";

export const metadata: Metadata = {
  title: "관리자 회원가입",
  description: "관리자 회원가입 페이지",
};

export default function AdminSignupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SignUpProviders>
      <PageHeader title="관리자 회원가입" />
      <MotionWrapper>
        <Toaster position="bottom-center" reverseOrder={false} />
        {children}
      </MotionWrapper>
    </SignUpProviders>
  );
}
