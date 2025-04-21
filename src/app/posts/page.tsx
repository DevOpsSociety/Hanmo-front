"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { findUser } from "../../api/user";
import Image from "next/image";
import leftBtn from "../../../public/leftButton.png";
import rightBtn from "../../../public/rightButton.png";
import deleteBtn from "../../../public/deleteButton.png";
import { createPost, deletePost, getPosts } from "../../api/post";
import axios from "axios";
import MotionWrapper from "../../components/MotionWrapper";

const PostsPage: React.FC = () => {
  const router = useRouter();

  const [content, setContent] = useState("");
  const [posts, setPosts] = useState<
    { nickName: string; id: number; content: string }[]
  >([]);

  const pageNumber = useRef(0);
  const totalPage = useRef(0); // 전체 페이지 수를 저장할 ref

  const userNickName = localStorage.getItem("nickname"); // 로컬스토리지에서 닉네임 가져오기

  const tempToken = localStorage.getItem("token"); // 로컬스토리지에서 토큰 가져오기

  useEffect(() => {
    console.log("PostsPage useEffect 실행");
    const checkToken = async () => {
      console.log("tempToken:", tempToken);

      if (!tempToken) {
        console.error("토큰이 없습니다.");
        router.push("/login"); // 토큰 없으면 로그인 페이지로 리다이렉트
        return;
      }

      try {
        const res = await findUser(tempToken); // findUser API 호출로 토큰 검증
        if (res.status !== 200) {
          router.push("/main"); // 토큰이 유효하면 main으로 리다이렉트
        }
      } catch (error) {
        console.error("유효하지 않은 토큰:", error);
        router.push("/login"); // 토큰 없으면 로그인 페이지로 리다이렉트
      }
    };

    checkToken();
  }, [router, tempToken]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!tempToken) {
        console.error("토큰이 없습니다.");
        return;
      }

      try {
        const res = await getPosts(tempToken, 0);

        console.log("res:", res.data);

        if (res.status === 200) {
          console.log("게시글 불러오기 성공:", res.data.content);
          console.log("전체 res:", res);

          setPosts(res.data.content); // 응답 형식에 따라 조정 필요
          totalPage.current = res.data.totalPages; // 전체 페이지 수 저장
        }
      } catch (err) {
        console.error("게시글 불러오기 실패:", err);
      }
    };

    fetchPosts();
  }, [tempToken]);

  const handlePrevPage = async () => {
    console.log("이전 페이지로 이동");

    if (!tempToken) {
      console.error("토큰이 없습니다.");
      return;
    }

    if (pageNumber.current <= 0) {
      console.error("첫 페이지입니다.");
      return;
    }

    try {
      const res = await getPosts(tempToken, --pageNumber.current); // 다음 페이지 API 호출

      if (res.status === 200) {
        console.log("게시글 불러오기 성공:", res.data.content);
        setPosts(res.data.content); // 응답 형식에 따라 조정 필요
      } else {
        console.error("게시글 불러오기 실패:", res.data);
      }
    } catch (error) {
      console.error("다음 페이지 불러오기 에러:", error);
    }
  };

  const handleNextPage = async () => {
    console.log("다음 페이지로 이동");

    if (!tempToken) {
      console.error("토큰이 없습니다.");
      return;
    }

    if (pageNumber.current >= totalPage.current - 1) {
      console.error("마지막 페이지입니다.");
      return;
    }

    try {
      const res = await getPosts(tempToken, ++pageNumber.current); // 다음 페이지 API 호출

      if (res.status === 200) {
        console.log("게시글 불러오기 성공:", res.data.content);
        setPosts(res.data.content); // 응답 형식에 따라 조정 필요
        console.log("pageNumber.current:", pageNumber.current);
      } else {
        console.error("게시글 불러오기 실패:", res.data);
      }
    } catch (error) {
      console.error("다음 페이지 불러오기 에러:", error);
      // 이전, 다음 페이지 클릭 시 토큰 만료되면 로그인페이지로 리다이렉트 코드 추가
      // 구분 방법은? 에러 코드? 아니면 시간 직접 비교 체크? 5분을?
    }
  };

  const handleCreatePost = async () => {
    console.log("게시글 작성하기");

    if (!content) {
      console.error("게시글 내용을 입력해주세요.");
      return;
    }

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
        if (axios.isAxiosError(error)) {
          console.error(error.response?.data.errorMessage);
        }
        console.error("게시글 작성 에러:", error);
      }
    }
  };

  const handleDeletePost = async (id: number) => {
    console.log("게시글 삭제하기");

    if (!tempToken) {
      console.error("토큰이 없습니다.");
      return;
    }

    try {
      console.log("id:", id);
      console.log("tempToken:", tempToken);

      const res = await deletePost(tempToken, id); // 게시글 삭제 API 호출 (예시로 ID 1 삭제)
      if (res.status === 200) {
        console.log("게시글 삭제 성공:", res.data);
      } else {
        console.error("게시글 삭제 실패:", res.data);
      }
    } catch (error) {
      console.error("게시글 삭제 에러:", error);
    }
  };

  return (
    <div className="w-[393px] h-[calc(100dvh-130px)] mx-auto flex flex-col gap-4 font-[Pretendard] relative">
      <MotionWrapper>
        <div className="flex flex-col gap-6 px-6">
          {posts.map((post, index) => (
            <div key={post.id}>
              <div className="flex items-center gap-3">
                <span className="font-bold">
                  {/* {post.id} */}
                  {post.nickName}
                </span>
                {/* 시간 추가할 건지 의논 후 추가하기 */}
                {/* <span className="text-xs">2025.04.04 16:42</span> */}
                {post.nickName === userNickName && (
                  <button onClick={() => handleDeletePost(post.id)}>
                    <Image src={deleteBtn} alt="삭제 버튼" />
                  </button>
                )}
              </div>
              <div
                className={`w-fit border rounded-bl-[20px] rounded-br-[20px] rounded-tr-[20px] rounded-tl-none p-3 text-sm font-semibold  ${
                  index % 2 ? "bg-[#1D5789] text-white" : "bg-[#AACCEC]"
                }`}
              >
                {post.content}
                {/* 일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오 */}
              </div>
            </div>
          ))}
        </div>
      </MotionWrapper>
      <div className="flex flex-col w-full gap-10 absolute bottom-0">
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
            placeholder="댓글을 작성해주세요. (최대 35자)"
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
