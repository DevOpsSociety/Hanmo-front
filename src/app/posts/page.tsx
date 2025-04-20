import React from "react";

const PostsPage: React.FC = () => {
  return (
    <div className="w-[393px] h-[calc(100vh-137px)] mx-auto flex flex-col gap-4 justify-between ">
      <div className="flex flex-col gap-4 px-4">
        <div className="bg-slate-700 h-[75px] w-full">
          <div className="bg-yellow-500">
            컴공의 수줍은 하마 <span className="text-xs">2025.04.04 16:42</span>{" "}
            X
          </div>
          <div>구리네요!!</div>
        </div>
        <div className="bg-slate-700 h-[75px] w-full">
          <div className="bg-yellow-500">
            컴공의 수줍은 하마 <span className="text-xs">2025.04.04 16:42</span>{" "}
            X
          </div>
          <div>구리네요!!</div>
        </div>
        <div className="bg-slate-700 h-[75px] w-full">
          <div className="bg-yellow-500">
            컴공의 수줍은 하마 <span className="text-xs">2025.04.04 16:42</span>{" "}
            X
          </div>
          <div>구리네요!!</div>
        </div>
        <div className="bg-slate-700 h-[75px] w-full">
          <div className="bg-yellow-500">
            컴공의 수줍은 하마 <span className="text-xs">2025.04.04 16:42</span>{" "}
            X
          </div>
          <div>구리네요!!</div>
        </div>
        <div className="bg-slate-700 h-[75px] w-full">
          <div className="bg-yellow-500">
            컴공의 수줍은 하마 <span className="text-xs">2025.04.04 16:42</span>{" "}
            X
          </div>
          <div>구리네요!!</div>
        </div>
      </div>
      <div className="flex flex-col w-full gap-10">
        <div className="text-center">왼쪽화살표 오른쪽화살표</div>
        <div className="grid grid-cols-6 border-2 h-[75px] items-center py-3 bg-[#D9D9D9] gap-4 px-4">
          <input
            type="text"
            placeholder="댓글을 작성해주세요."
            className="col-span-5 rounded-2xl h-full px-4"
          />
          <button className="col-span-1 border border-black h-full rounded-2xl">
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostsPage;
