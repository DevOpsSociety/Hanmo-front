"use client";

import React from "react";
import { useSelector } from "react-redux";
import PageHeader from "../../components/PageHeader";
import { RootState } from "../../store";

export default function ChatLayoutClient({ children }: { children: React.ReactNode; }) {
  const createdAt = useSelector((state: RootState) => state.chat.createdAt);

  return (
    <div className="overflow-hidden">
      <PageHeader title={createdAt || "24:00"} />
      {children}
    </div>
  );
}