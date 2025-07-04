import { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import MotionWrapper from "../../../components/MotionWrapper";
import PageHeader from "../../../components/PageHeader";

export const metadata: Metadata = {
  title: "관리자 로그인",
  description: "관리자 로그인 페이지",
};

export default function AdminLoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <PageHeader title="관리자 로그인" />
      <MotionWrapper>
        <Toaster position="top-center" reverseOrder={false} />
        {children}
      </MotionWrapper>
    </div>
  );
}
