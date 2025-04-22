"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { findUser } from "../../api/user";
import Image from "next/image";
import leftBtn from "../../../public/leftButton.png";
import rightBtn from "../../../public/rightButton.png";
import deleteBtn from "../../../public/deleteButton.png";
import editBtn from "../../../public/edit.png";
import { createPost, deletePost, editPost, getPosts } from "../../api/post";
import axios from "axios";
import MotionWrapper from "../../components/MotionWrapper";

const PostsPage: React.FC = () => {
  const router = useRouter();

  const [content, setContent] = useState("");
  const [posts, setPosts] = useState<
    { nickName: string; id: number; content: string }[]
  >([]);

  const [isEditing, setIsEditing] = useState(false);
  const [editPostId, setEditPostId] = useState<number | null>(null);

  const pageNumber = useRef(0);
  const totalPage = useRef(0); // 전체 페이지 수를 저장할 ref

  const [userNickName, setUserNickName] = useState<string | null>(null);
  const [tempToken, setTempToken] = useState<string | null>(null);

  const fetchPosts = async (token: string) => {
    // if (!tempToken) {
    //   console.error("토큰이 없습니다.");
    //   router.push("/login"); // 토큰 없으면 로그인 페이지로 리다이렉트
    //   return;
    // }

    try {
      const res = await getPosts(token, pageNumber.current);
      if (res.status === 200) {
        setPosts(res.data.content);
        totalPage.current = res.data.totalPages;
      }
    } catch (err) {
      console.error("게시글 조회 실패:", err);
    }
  };

  useEffect(() => {
    console.log("PostsPage useEffect 실행");

    const nickname = localStorage.getItem("nickname");
    const token = localStorage.getItem("token");

    console.log("nickname:", nickname);
    console.log("token:", token);

    if (nickname) setUserNickName(nickname);
    if (token) setTempToken(token);

    console.log("tempToken:", tempToken);

    if (!token) {
      console.error("토큰이 없습니다.");
      router.push("/login"); // 토큰 없으면 로그인 페이지로 리다이렉트
      return;
    }

    const checkToken = async () => {
      try {
        const res = await findUser(token); // findUser API 호출로 토큰 검증
        if (res.status !== 200) {
          router.push("/main"); // 토큰이 유효하면 main으로 리다이렉트
        }
      } catch (error) {
        console.error("유효하지 않은 토큰:", error);
        router.push("/login"); // 토큰 없으면 로그인 페이지로 리다이렉트
      }
    };

    checkToken();
    fetchPosts(token); // fetchPosts도 token 인자로 받게 수정
  }, [router, tempToken, userNickName]);

  // useEffect(() => {
  //   console.log("PostsPage useEffect 실행");
  // }, [tempToken]);

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
    if (!tempToken) {
      console.error("토큰이 없습니다.");
      return;
    }

    if (!content) {
      console.error("게시글 내용을 입력해주세요.");
      return;
    }

    console.log(isEditing, editPostId);

    try {
      if (isEditing !== false && editPostId !== null) {
        // 수정 로직
        console.log("게시글 수정하기");
        const res = await editPost(tempToken, content, editPostId);
        if (res.status === 200) {
          console.log("게시글 수정 성공");
          setIsEditing(false);
          setEditPostId(null);
          setContent(""); // 입력 필드 초기화
        } else {
          console.error("게시글 수정 실패:", res.data);
        }
      } else {
        console.log("게시글 작성하기");

        const res = await createPost(tempToken, content); // 게시글 작성 API 호출

        if (res.status === 200) {
          console.log("게시글 작성 성공:", res.data);
          setContent(""); // 입력 필드 초기화
        } else {
          console.error("게시글 작성 실패:", res.data);
        }
      }

      await fetchPosts(tempToken); // 게시글 작성 후 게시글 목록 다시 불러오기
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.errorMessage);
      }
      console.error("게시글 작성 에러:", error);
    }
  };

  const handleEditPost = (id: number, content: string) => {
    console.log("게시글 수정하기");

    if (!tempToken) {
      console.error("토큰이 없습니다.");
      return;
    }

    setContent(content); // 인풋창에 기존 내용 표시
    setEditPostId(id); // 수정 중인 게시글 ID 저장
    setIsEditing(true); // 수정 모드 진입
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
        await fetchPosts(tempToken); // 게시글 작성 후 게시글 목록 다시 불러오기
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
                  <>
                    <button
                      onClick={() => handleEditPost(post.id, post.content)}
                    >
                      <Image
                        src={editBtn}
                        alt="수정 버튼"
                        className="w-[20px] h-[20px]"
                      />
                    </button>
                    <button onClick={() => handleDeletePost(post.id)}>
                      <Image
                        src={deleteBtn}
                        alt="삭제 버튼"
                        className="w-[20px] h-[20px]"
                      />
                    </button>
                  </>
                )}
              </div>
              <div
                className={`w-fit border rounded-bl-[20px] rounded-br-[20px] rounded-tr-[20px] rounded-tl-none p-3 text-sm font-semibold  ${
                  index % 2 ? "bg-[#1D5789] text-white" : "bg-[#AACCEC]"
                }`}
              >
                {post.content}
                {/* 일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오 */}
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
            placeholder="댓글을 작성해주세요. (최대 20자)"
            className="col-span-5 rounded-2xl h-full px-4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            onClick={handleCreatePost}
            className="col-span-1 border border-black h-full rounded-2xl font-[manseh] text-xl"
          >
            {isEditing ? "수정" : "등록"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostsPage;
