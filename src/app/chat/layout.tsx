import React from "react";
import PageHeader from "../../components/PageHeader";
export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden">
      <PageHeader title={"23:59"} />
      {children}
    </div>
  );
}
