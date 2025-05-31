import React from "react";
import HanmoHeader from "../../components/HanmoHeader/HanmoHeader";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden">
      <header className="h-[70px] w-full mt-5 flex justify-center items-center relative">
        <HanmoHeader />
      </header>
      {children}
    </div>
  );
}
