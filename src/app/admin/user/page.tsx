"use client";

import { useEffect, useState } from "react";
import { adminDeleteUser, adminFindUser, adminUpdateUserRole } from "../../../api/admin/adminUser";
import UserTable from "../../../components/UserTable";
import { Role } from "../../../enums";

export default function AdminUserPage(): JSX.Element {
  const [nickname, setNickname] = useState("");
  const [userList, setUserList] = useState([]);
  const [tempToken, setTempToken] = useState("");


  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "ADMIN") {
      alert("관리자 권한이 없습니다.");
      window.location.href = "/admin/login"; // 관리자 로그인 페이지로 리다이렉트
    } else {
      console.log("관리자 권한 확인 완료");
      setTempToken(token);
    }
  }, []);

  const handleSearch = async () => {
    try {
      const res = await adminFindUser(tempToken, nickname);

      console.log("사용자 조회 요청:", nickname); // 요청 확인용 로그 추가

      console.log("사용자 조회 응답:", res); // 응답 확인용 로그 추가 

      if (res.status === 200) {
        setUserList(res.data); // API 응답 형태에 따라 조정
      } else {
        alert("사용자 조회 실패");
      }
    } catch (error) {
      console.error("사용자 조회 에러:", error);
      alert("조회 중 오류가 발생했습니다.");
    }
  };

  const handleDelete = async (nickname: string) => {
    const confirmed = window.confirm(
      `'${nickname}' 사용자를 정말 삭제하시겠습니까?`
    );

    if (!confirmed) return;

    try {
      const res = await adminDeleteUser(tempToken, nickname);

      if (res.status === 200) {
        alert(`'${nickname}' 사용자 삭제 완료`);
        await handleSearch(); // 삭제 후 리스트 갱신
      } else {
        alert("삭제에 실패했습니다.");
      }
    } catch (err) {
      console.error("삭제 오류:", err);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };


  const handleChangeRole = async (userId: number, newRole: keyof typeof Role) => {
    const confirmed = window.confirm(
      `${newRole} 권한으로 변경하시겠습니까?`
    );

    if (!confirmed) return;

    // 문자열 숫자로 변환
    const roleValue = String(Role[newRole]);

    console.log("권한 변경 요청:", userId, roleValue);

    try {
      const res = await adminUpdateUserRole(tempToken, userId, roleValue);
      if (res.status === 200) {
        alert("권한 변경 완료");
        await handleSearch();
      } else {
        alert("변경 실패");
      }
    } catch (err) {
      console.error("권한 변경 에러:", err);
      alert("에러가 발생했습니다.");
    }
  };


  return (
    <div className="flex flex-col gap-4 justify-center items-center h-[calc(100dvh-73px)] font-[pretendard]">
      <div>
        <label>사용자 닉네임 or 이름 입력 :</label>
        <input
          id="nickname"
          type="text"
          className="border border-gray-300 rounded-md p-2 mx-2"
          placeholder="사용자 닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-[#04447C] text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          조회
        </button>
      </div>
      <UserTable users={userList} onDelete={handleDelete} onChangeRole={handleChangeRole}
      />
    </div>
  );
};
