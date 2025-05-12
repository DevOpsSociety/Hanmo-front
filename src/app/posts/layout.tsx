import React from "react";
import HanmoHeader from "../../components/HanmoHeader/HanmoHeader";

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden">
      <header className="h-[70px] w-full mt-5 flex justify-center items-center relative">
        <HanmoHeader />
        {/* <Link href="/main">
          <Image
            src={HanmoIcon}
            alt="Comment Header"
            className="w-[84px] h-[66px] cursor-pointer"
          />
        </Link>
        <Image
          src={commentImg}
          alt="Comment Header"
          className="w-[100px] h-[66px] absolute left-1/2 translate-x-[50px] top-0"
        /> */}
      </header>
      {children}
    </div>
  );
}
