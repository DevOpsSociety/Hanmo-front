"use client";

import { useEffect, useState } from "react";
import {
  adminDeleteUser,
  adminFindUser,
  adminUpdateUserRole,
} from "../../../api/admin/adminUser";
import UserTable from "../../../components/UserTable";
import { Role } from "../../../enums";

export default function AdminUserPage(): JSX.Element {
  const [nickname, setNickname] = useState("");
  const [userList, setUserList] = useState([]);
  const [tempToken, setTempToken] = useState("");

  const [pageNumber, setPageNumber] = useState(0);
  const [lastPageNumber, setLastPageNumber] = useState(0);
  const [visiblePageStart, setVisiblePageStart] = useState(0);
  const visiblePageCount = 5;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "ADMIN") {
      alert("관리자 권한이 없습니다.");
      window.location.href = "/admin/login";
    } else {
      setTempToken(token);
    }
  }, []);

  useEffect(() => {
    if (tempToken) handleSearch();
  }, [tempToken]);

  const handleSearch = async (pageNumber: number = 0) => {
    try {
      const res = await adminFindUser(tempToken, nickname, pageNumber);
      console.log("조회 응답:", res); // 응답 확인용 로그 추가
      if (res.status === 200) {
        setUserList(res.data.content);
        setPageNumber(res.data.pageNumber);
        setLastPageNumber(res.data.totalPages);
      } else {
        alert("사용자 조회 실패");
      }
    } catch (error) {
      console.error("조회 오류:", error);
      alert("조회 중 오류 발생");
    }
  };

  const handleDelete = async (nickname: string) => {
    if (!confirm(`'${nickname}' 사용자를 정말 삭제하시겠습니까?`)) return;

    try {
      const res = await adminDeleteUser(tempToken, nickname);
      if (res.status === 200) {
        alert("삭제 완료");
        await handleSearch();
      } else {
        alert("삭제 실패");
      }
    } catch (error) {
      console.error("삭제 오류:", error);
      alert("삭제 중 오류 발생");
    }
  };

  const handleChangeRole = async (userId: number, newRole: keyof typeof Role) => {
    if (!confirm(`${newRole} 권한으로 변경하시겠습니까?`)) return;

    const roleValue = String(Role[newRole]);
    try {
      const res = await adminUpdateUserRole(tempToken, userId, roleValue);
      if (res.status === 200) {
        alert("권한 변경 완료");
        await handleSearch();
      } else {
        alert("변경 실패");
      }
    } catch (error) {
      console.error("권한 변경 오류:", error);
      alert("에러 발생");
    }
  };

  const handlePrevPage = () => {
    if (pageNumber <= 0) return;
    handleSearch(pageNumber - 1);
    if (visiblePageStart > 0) {
      setVisiblePageStart((prev) => prev - visiblePageCount);
    }
  };

  const handleNextPage = () => {
    const nextPage = pageNumber + 1;
    if (nextPage >= lastPageNumber) return;
    handleSearch(nextPage);
    if (nextPage >= visiblePageStart + visiblePageCount) {
      setVisiblePageStart((prev) => prev + visiblePageCount);
    }
  };

  const handleClickPageNumber = (page: number) => {
    handleSearch(page);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault(); // prevent page reload
        handleSearch();
      }}
      className="flex flex-col gap-4 justify-center items-center h-[calc(100dvh-73px)] font-[pretendard] overflow-y-hidden"
    >
      <div>
        <label>사용자 닉네임 or 이름 입력 :</label>
        <input
          id="nickname"
          type="text"
          className="border border-gray-300 rounded-md p-2 mx-2"
          placeholder="사용자 닉네임 or 이름"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <button
          type="submit"
          className="bg-[#04447C] text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          조회
        </button>
      </div>

      <UserTable
        users={userList}
        onDelete={handleDelete}
        onChangeRole={handleChangeRole}
      />

      {lastPageNumber > 1 && (
        <div className="flex items-center gap-4 mt-4">
          <button
            type="button"
            onClick={handlePrevPage}
            className="px-3 py-1 border rounded disabled:opacity-50"
            disabled={pageNumber === 0}
          >
            이전
          </button>

          {Array.from({ length: visiblePageCount }, (_, i) => {
            const page = visiblePageStart + i;
            if (page >= lastPageNumber) return null;
            return (
              <button
                key={page}
                type="button"
                onClick={() => handleClickPageNumber(page)}
                className={`px-3 py-1 border rounded ${pageNumber === page
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700"
                  }`}
              >
                {page + 1}
              </button>
            );
          })}

          <button
            type="button"
            onClick={handleNextPage}
            className="px-3 py-1 border rounded disabled:opacity-50"
            disabled={pageNumber >= lastPageNumber - 1}
          >
            다음
          </button>
        </div>
      )}
    </form>
  );
}
