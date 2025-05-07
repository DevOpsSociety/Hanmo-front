"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPost, deletePost, editPost, getPosts } from "../api/post";
import { findUser } from "../api/user";

interface Post {
  id: number;
  nickName: string;
  content: string;
}

export default function usePosts() {
  const router = useRouter();

  const [content, setContent] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editPostId, setEditPostId] = useState<number | null>(null);

  const [pageNumber, setPageNumber] = useState(0);
  const [lastPageNumber, setLastPageNumber] = useState(0);
  const [visiblePageStart, setVisiblePageStart] = useState(0);
  const visiblePageCount = 5;

  const [userNickName, setUserNickName] = useState<string | null>(null);
  const [tempToken, setTempToken] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const fetchPosts = async (token: string, page = pageNumber) => {
    try {
      const res = await getPosts(token, page);
      if (res.status === 200) {
        setPosts(res.data.content);
        setPageNumber(res.data.pageNumber);
        setLastPageNumber(res.data.totalPages);
      }
    } catch (err) {
      console.error("게시글 조회 실패:", err);
    }
  };

  const checkAuth = () => {
    const nickname = localStorage.getItem("nickname");
    const token = localStorage.getItem("token");

    if (nickname) setUserNickName(nickname);
    if (token) setTempToken(token);

    if (!token) {
      router.push("/login");
      return;
    }

    findUser(token)
      .then((res) => {
        if (res.status !== 200) {
          router.push("/main");
        }
      })
      .catch(() => {
        router.push("/login");
      });

    fetchPosts(token);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handlePrevPage = async () => {
    if (!tempToken || pageNumber <= 0) return;

    try {
      const res = await getPosts(tempToken, pageNumber - 1);
      if (res.status === 200) {
        setPosts(res.data.content);
        setPageNumber((prev) => prev - 1);
        if (visiblePageStart > 0) {
          setVisiblePageStart((prev) => prev - visiblePageCount);
        }
      }
    } catch (error) {
      console.error("이전 페이지 에러:", error);
    }
  };

  const handleNextPage = async () => {
    if (!tempToken || pageNumber >= lastPageNumber - 1) return;

    try {
      const nextPage = pageNumber + 1;
      const res = await getPosts(tempToken, nextPage);
      if (res.status === 200) {
        setPosts(res.data.content);
        setPageNumber(nextPage);
        if (nextPage >= visiblePageStart + visiblePageCount) {
          setVisiblePageStart((prev) => prev + visiblePageCount);
        }
      }
    } catch (error) {
      console.error("다음 페이지 에러:", error);
    }
  };

  const handleClickPageNumber = async (page: number) => {
    if (!tempToken) return;

    try {
      const res = await getPosts(tempToken, page);
      if (res.status === 200) {
        setPosts(res.data.content);
        setPageNumber(page);
      }
    } catch (error) {
      console.error("페이지 클릭 에러:", error);
    }
  };

  const handleCreatePost = async () => {
    if (!tempToken || !content) return;

    try {
      if (isEditing && editPostId !== null) {
        const res = await editPost(tempToken, content, editPostId);
        if (res.status === 200) {
          setIsEditing(false);
          setEditPostId(null);
          setContent("");
        }
      } else {
        const res = await createPost(tempToken, content);
        if (res.status === 200) {
          setContent("");
        }
      }

      await fetchPosts(tempToken);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.errorMessage);
      }
    }
  };

  const handleEditPost = (id: number, content: string) => {
    setContent(content);
    setEditPostId(id);
    setIsEditing(true);
    inputRef.current?.focus();
  };

  const handleDeletePost = async (id: number) => {
    if (!tempToken) return;

    try {
      const res = await deletePost(tempToken, id);
      if (res.status === 200) {
        await fetchPosts(tempToken);
      }
    } catch (error) {
      console.error("삭제 에러:", error);
    }
  };

  return {
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
  };
}
