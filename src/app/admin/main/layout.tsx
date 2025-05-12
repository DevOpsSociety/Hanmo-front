import { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import MotionWrapper from "../../../components/MotionWrapper";
import PageHeader from "../../../components/PageHeader";
import SignUpProviders from "../../../components/provider/SignUpProviders";

export const metadata: Metadata = {
  title: "Admin",
  description: "관리자 메인 페이지",
};

export default function AdminMainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SignUpProviders>
      <PageHeader title="관리자 페이지" />
      <MotionWrapper>
        <Toaster position="bottom-center" reverseOrder={false} />
        {children}
      </MotionWrapper>
    </SignUpProviders>
  );
}
