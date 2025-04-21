import Image from "next/image";
import React from "react";
import HanmoIcon from "../../../public/commentImg1.png";
import commentImg from "../../../public/commentImg2.png";

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden">
      <header className="h-[110px] w-full mt-5 flex justify-center items-center relative">
        <Image
          src={HanmoIcon}
          alt="Comment Header"
          className="w-[84px] h-[66px]"
        />
        <Image
          src={commentImg}
          alt="Comment Header"
          className="w-[100px] h-[66px] absolute left-1/2 translate-x-[50px] top-0"
        />
      </header>
      {children}
    </div>
  );
}
