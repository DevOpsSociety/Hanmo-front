"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { adminFindMatchingGroups, adminFindUser, adminFindUserSignupCount } from "../../../api/admin/adminUser";
import { findUser } from "../../../api/user";

export default function AdminMainPage(): JSX.Element {

  const [todaySignupCount, setTodaySignupCount] = useState("");
  const [todayMatchedGroupCount, setTodayMatchedGroupCount] = useState("");

  useEffect(() => {
    const tempToken = localStorage.getItem("token");
    const nickname = localStorage.getItem("nickname");

    if (!nickname || !tempToken) {
      console.error("사용자 정보가 없습니다.");
      window.location.href = "/admin/login";
      return;
    }

    const checkToken = async () => {
      const res = await findUser(tempToken);
      console.log("토큰 확인 응답:", res); // 응답 확인용 로그 추가
      if (res.status !== 200) {
        console.error("잘못된 토큰입니다. 다시 로그인 해주세요.");
        window.location.href = "/admin/login"; // 관리자 로그인 페이지로 리다이렉트
      }
    };


    const checkAdmin = async () => {
      const res = await adminFindUser(tempToken, nickname);
      console.log("관리자 확인 응답:", res); // 응답 확인용 로그 추가
      const resUserRole = res.data.content[0].userRole;
      if (resUserRole !== "ADMIN") {
        console.error("관리자 권한이 없습니다.");
        window.location.href = "/admin/login"; // 관리자 로그인 페이지로 리다이렉트
      }
    };


    const todayMatchedGroupCount = async () => {
      try {
        const res = await adminFindMatchingGroups(tempToken);
        // console.log("매칭된 그룹 수:", res); // API 응답 형태에 따라 조정
        setTodayMatchedGroupCount(res.data.todayMatchedGroupCount);
        return res; // 매칭된 그룹 수 반환
      } catch (error) {
        console.error("매칭된 그룹 수 조회 에러:", error);
        // alert("매칭된 그룹 수 조회 중 오류가 발생했습니다.");
        window.location.href = "/admin/login"; // 관리자 로그인 페이지로 리다이렉트

      }
    };

    const todaySignupCount = async () => {
      try {
        const res = await adminFindUserSignupCount(tempToken);
        // console.log("가입자 수:", res); // API 응답 형태에 따라 조정
        setTodaySignupCount(res.data.todayMatchedSignUpCount);
        return res; // 가입자 수 반환
      } catch (error) {
        console.error("가입자 수 조회 에러:", error);
        alert("가입자 수 조회 중 오류가 발생했습니다.");
        window.location.href = "/admin/login"; // 관리자 로그인 페이지로 리다이렉트

      }
    };

    checkToken();
    checkAdmin();
    todayMatchedGroupCount();
    todaySignupCount();
  }, []);

  useEffect(() => {

  }, []);

  return (
    <div className="min-h-[calc(100dvh-73px)] flex flex-col items-center justify-center bg-gray-50 px-6 py-10 font-[Pretendard]">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">관리자 대시보드</h1>

        <div className="space-y-2">
          <p className="text-gray-600">{todayMatchedGroupCount}</p>
          <p className="text-gray-600">{todaySignupCount}</p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex gap-4">
            <Link href="/admin/user" className="w-full">
              <div className="inline-block px-6 py-3 bg-[#04447C] text-white rounded-lg shadow cursor-pointer w-full">
                사용자 관리 페이지
              </div>
            </Link>
            <Link href="/admin/matching-queue" className="w-full">
              <div className="inline-block px-6 py-3 bg-[#04447C] text-white rounded-lg shadow cursor-pointer w-full">
                매칭 대기 인원 조회
              </div>
            </Link>
          </div>
          <Link href="/main">
            <div className="inline-block px-6 py-3 border border-[#04447C] rounded-lg cursor-pointer w-full">
              사용자 메인 페이지로 이동
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
