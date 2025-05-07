"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { adminFindMatchingGroups, adminFindUserSignupCount } from "../../../api/admin/adminUser";

export default function AdminMainPage(): JSX.Element {

  const [todaySignupCount, setTodaySignupCount] = useState("");
  const [todayMatchedGroupCount, setTodayMatchedGroupCount] = useState("");

  useEffect(() => {
    const tempToken = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!tempToken || role !== "ADMIN") {
      alert("관리자 권한이 없습니다.");
      window.location.href = "/admin/login";
    } else {
      console.log("관리자 권한 확인 완료");

      const todayMatchedGroupCount = async () => {
        try {
          const res = await adminFindMatchingGroups(tempToken);
          console.log("매칭된 그룹 수:", res); // API 응답 형태에 따라 조정
          setTodayMatchedGroupCount(res.data.todayMatchedGroupCount);
          return res; // 매칭된 그룹 수 반환
        } catch (error) {
          console.error("매칭된 그룹 수 조회 에러:", error);
          alert("조회 중 오류가 발생했습니다.");
        }
      };

      const todaySignupCount = async () => {
        try {
          const res = await adminFindUserSignupCount(tempToken);
          console.log("가입자 수:", res); // API 응답 형태에 따라 조정
          setTodaySignupCount(res.data.todayMatchedSignUpCount);
          return res; // 가입자 수 반환
        } catch (error) {
          console.error("가입자 수 조회 에러:", error);
          alert("조회 중 오류가 발생했습니다.");
        }
      };

      todayMatchedGroupCount();
      todaySignupCount();
    }
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
        <div className="flex flex-col gap-2">
          <Link href="/admin/user">
            <div className="inline-block px-6 py-3 bg-[#04447C] text-white rounded-lg shadow hover:bg-blue-700 transition-colors cursor-pointer">
              사용자 관리 페이지
            </div>
          </Link>
          <Link href="/main">
            <div className="inline-block px-6 py-3 bg-[#04447C] text-white rounded-lg shadow hover:bg-blue-700 transition-colors cursor-pointer">
              사용자 메인 페이지로 이동
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
