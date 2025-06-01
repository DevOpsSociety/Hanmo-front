import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import MotionWrapper from "../../components/MotionWrapper";
import PageHeader from "../../components/PageHeader";

export const metadata: Metadata = {
  title: "한모 회원탈퇴",
  description: "한모 회원탈퇴 페이지",
};

export default function withdrawLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <PageHeader title="회원탈퇴" />
      <MotionWrapper>
        <Toaster position="top-center" reverseOrder={false} />
        {children}
      </MotionWrapper>
    </div>
  );
}
