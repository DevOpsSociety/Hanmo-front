"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { findUser } from "../../api/user";
import Image from "next/image";
import leftBtn from "../../../public/leftButton.png";
import rightBtn from "../../../public/rightButton.png";
import deleteBtn from "../../../public/deleteButton.png";
import { createPost, deletePost, getPosts } from "../../api/post";

const PostsPage: React.FC = () => {
  const router = useRouter();

  const [content, setContent] = useState("");
  const [posts, setPosts] = useState<{ nickName: string; content: string }[]>(
    []
  );

  useEffect(() => {
    console.log("PostsPage useEffect 실행");
    const checkToken = async () => {
      const tempToken = localStorage.getItem("token"); // 로컬스토리지에서 토큰 가져오기
      console.log("tempToken:", tempToken);
      if (tempToken) {
        try {
          const res = await findUser(tempToken); // findUser API 호출로 토큰 검증
          if (res.status !== 200) {
            router.push("/main"); // 토큰이 유효하면 main으로 리다이렉트
          }
        } catch (error) {
          console.error("유효하지 않은 토큰:", error);
        }
      } else {
        router.push("/login"); // 토큰 없으면 로그인 페이지로 리다이렉트
      }
    };

    checkToken();
  }, [router]);

  useEffect(() => {
    const tempToken = localStorage.getItem("token"); // 로컬스토리지에서 토큰 가져오기
    const fetchPosts = async () => {
      if (tempToken) {
        try {
          const res = await getPosts(tempToken, 0, 5); // 예시 API

          console.log("res:", res.data);

          if (res.status === 200) {
            console.log("게시글 불러오기 성공:", res.data.content);
            setPosts(res.data.content); // 응답 형식에 따라 조정 필요
          }
        } catch (err) {
          console.error("게시글 불러오기 실패:", err);
        }
      }
    };

    fetchPosts();
  }, []);

  const handlePrevPage = () => {
    console.log("이전 페이지로 이동");
  };

  const handleNextPage = () => {
    console.log("다음 페이지로 이동");
  };

  const handleCreatePost = async () => {
    console.log("게시글 작성하기");

    const tempToken = localStorage.getItem("token"); // 로컬스토리지에서 토큰 가져오기

    if (tempToken) {
      try {
        const res = await createPost(tempToken, content); // 게시글 작성 API 호출

        if (res.status === 200) {
          console.log("게시글 작성 성공:", res.data);
          setContent(""); // 입력 필드 초기화
        } else {
          console.error("게시글 작성 실패:", res.data);
        }
      } catch (error) {
        console.error("게시글 작성 에러:", error);
      }
    }
  };

  const handleDeletePost = async (id: number) => {
    console.log("게시글 삭제하기");
    // 삭제 로직 구현 필요
    const tempToken = localStorage.getItem("token"); // 로컬스토리지에서 토큰 가져오기
    if (tempToken) {
      try {
        const res = await deletePost(tempToken, id); // 게시글 삭제 API 호출 (예시로 ID 1 삭제)
        if (res.status === 200) {
          console.log("게시글 삭제 성공:", res.data);
        } else {
          console.error("게시글 삭제 실패:", res.data);
        }
      } catch (error) {
        console.error("게시글 삭제 에러:", error);
      }
    }
  };

  return (
    <div className="w-[393px] h-[calc(100dvh-137px)] mx-auto flex flex-col gap-4 justify-between font-[Pretendard]">
      <div className="flex flex-col gap-6 px-4">
        {posts.map((post, index) => (
          <div key={index} className="h-[75px] w-full">
            <div className="flex items-center gap-3">
              <span className="font-bold">
                {/* {index} */}
                {post.nickName}
              </span>
              {/* 시간 추가할 건지 의논 후 추가하기 */}
              {/* <span className="text-xs">2025.04.04 16:42</span> */}
              <button onClick={() => handleDeletePost(index)}>
                <Image src={deleteBtn} alt="삭제 버튼" />
              </button>
            </div>
            <div
              className={`w-fit border rounded-bl-[20px] rounded-br-[20px] rounded-tr-[20px] rounded-tl-none p-3 text-lg font-semibold  ${
                index % 2 ? "bg-[#1D5789] text-white" : "bg-[#AACCEC]"
              }`}
            >
              {post.content}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col w-full gap-10">
        <div className="flex justify-center gap-20">
          <button onClick={handlePrevPage}>
            <Image src={leftBtn} alt="왼쪽 버튼" />
          </button>
          <button onClick={handleNextPage}>
            <Image src={rightBtn} alt="오른쪽 버튼" />
          </button>
        </div>
        <div className="grid grid-cols-6 h-[75px] items-center py-3 bg-[#D9D9D9] gap-4 px-4">
          <input
            type="text"
            placeholder="댓글을 작성해주세요."
            className="col-span-5 rounded-2xl h-full px-4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            onClick={handleCreatePost}
            className="col-span-1 border border-black h-full rounded-2xl font-[manseh] text-xl"
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostsPage;
