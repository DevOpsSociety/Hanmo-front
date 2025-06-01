import { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import MotionWrapper from "../../../components/MotionWrapper";
import PageHeader from "../../../components/PageHeader";
import SignUpProviders from "../../../components/provider/SignUpProviders";

export const metadata: Metadata = {
  title: "Admin",
  description: "관리자 메인 페이지",
};

export default function AdminUserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SignUpProviders>
      <PageHeader title="사용자 관리" />
      <MotionWrapper>
        <Toaster position="top-center" reverseOrder={false} />
        {children}
      </MotionWrapper>
    </SignUpProviders>
  );
}
