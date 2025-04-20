import Image from "next/image";
import React from "react";
import PostsImg from "../../../public/commentHeader.png";

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className="h-[110px] w-full mb-[27px]">
        <Image
          src={PostsImg}
          alt="Comment Header"
          className="w-[190px] h-[110px] mx-auto"
        />
      </header>
      {children}
    </div>
  );
}
