import api from "./axiosInstance";

// 1. 전체 게시글 불러오기
export const getPosts = (tempToken: string, page: number, size: number = 5) => {
  return api.get("/posts", {
    params: {
      page,
      size,
    },
    headers: {
      tempToken: tempToken,
    },
  });
};

// 2. 게시글 작성하기
export const createPost = (tempToken: string, content: string) => {
  return api.post(
    "/posts/create",
    { content },
    {
      headers: {
        tempToken: tempToken, // Authorization 헤더에 토큰 추가
      },
    }
  );
};

// 3. 게시글 삭제하기
export const deletePost = (tempToken: string, postId: number) => {
  return api.delete(`/posts/${postId}`, {
    headers: {
      tempToken: tempToken, // Authorization 헤더에 토큰 추가
    },
  });
};
