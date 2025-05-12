"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { findUser } from "../api/user";

export const useAuthGuard = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("토큰이 없습니다.");
      toast.error("다시 로그인 해주세요.");
      router.push("/login");
      return;
    }

    const checkToken = async () => {
      try {
        const res = await findUser(token);
        if (res.status !== 200) {
          console.error("잘못된 토큰입니다.");
          toast.error("다시 로그인 해주세요.");
          router.push("/login");
        }
      } catch (err) {
        console.error("토큰 확인 중 오류:", err);
        toast.error("다시 로그인 해주세요.");
        router.push("/login");
      }
    };

    checkToken();
  }, [router]);
};
