"use client";

import Image from "next/image";
import React from "react";
import deleteBtn from "../../../public/deleteButton.svg";
import editBtn from "../../../public/edit.svg";
import leftBtn from "../../../public/leftButton.svg";
import submitBtn from "../../../public/postSubmit.svg";
import rightBtn from "../../../public/rightButton.svg";
import MotionWrapper from "../../components/MotionWrapper";
import usePosts from "../../hooks/usePosts";

const PostsPage: React.FC = () => {
  const {
    content,
    setContent,
    posts,
    pageNumber,
    lastPageNumber,
    visiblePageStart,
    visiblePageCount,
    isEditing,
    inputRef,
    userNickName,
    handlePrevPage,
    handleNextPage,
    handleClickPageNumber,
    handleCreatePost,
    handleEditPost,
    handleDeletePost,
  } = usePosts();

  return (
    <div className="max-w-[393px] h-[calc(100dvh-130px)] mx-auto flex flex-col gap-4 font-[Pretendard] relative">
      <MotionWrapper>
        <div className="flex flex-col gap-6 px-6 overflow-y-auto max-h-[calc(100dvh-270px)]">
          {posts.map((post) => (
            <div key={post.id} className="flex flex-col gap-1">
              <div>
                <span className="font-bold text-[#134D80]">{post.nickName}</span>
              </div>
              <div className="flex items-end gap-2">
                <div
                  className={`w-fit border rounded-bl-[20px] rounded-br-[20px] rounded-tr-[20px] rounded-tl-none p-3 text-sm font-semibold text-white ${post.nickName === userNickName ? "bg-[#134D80]" : "bg-[#AACCEC]"
                    }`}
                >
                  {post.content}
                </div>
                <div className="flex flex-col gap-2">
                  {post.nickName === userNickName && (
                    <div className="flex gap-2">
                      <button onClick={() => handleDeletePost(post.id)}>
                        <Image src={deleteBtn} alt="삭제 버튼" className="w-[20px] h-[20px]" />
                      </button>
                      <button onClick={() => handleEditPost(post.id, post.content)}>
                        <Image src={editBtn} alt="수정 버튼" className="w-[20px] h-[20px]" />
                      </button>
                    </div>
                  )}
                  <span className="text-xs text-[#a6a6a6]">2025.04.04 16:42</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </MotionWrapper>

      <div className="flex flex-col w-full gap-3 absolute bottom-0">
        <div className="flex justify-center gap-10 items-center font-[manseh] text-xl font-bold px-6 mb-4">
          <div className="flex gap-6 items-center">
            <button onClick={handlePrevPage}>
              <Image src={leftBtn} alt="왼쪽 버튼" />
            </button>

            {/* 페이지 번호 목록 */}
            {Array.from({ length: visiblePageCount }, (_, i) => {
              const pageIndex = visiblePageStart + i;
              if (pageIndex >= lastPageNumber) return null;

              return (
                <button
                  key={pageIndex}
                  onClick={() => handleClickPageNumber(pageIndex)}
                  className={
                    pageNumber === pageIndex
                      ? "text-[#134D80] font-bold"
                      : "text-[#e6e6e6] font-light"
                  }
                >
                  {pageIndex + 1}
                </button>
              );
            })}

            <button onClick={handleNextPage}>
              <Image src={rightBtn} alt="오른쪽 버튼" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-6 h-[75px] items-center py-3 gap-4 px-4 border-t border-[#e6e6e6]">
          <input
            type="text"
            placeholder="예쁜 말만 부탁드립니다 ^_^ (최대 20자)"
            className="col-span-5 rounded-2xl h-full px-4 bg-[#F7F7F7] placeholder:font-[manseh]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            ref={inputRef}
          />
          <button onClick={handleCreatePost} className="col-span-1 h-full rounded-2xl font-[manseh] text-xl">
            {isEditing ? (
              <Image src={editBtn} alt="수정버튼" width={46} height={46} />
            ) : (
              <Image src={submitBtn} alt="제출버튼" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostsPage;
