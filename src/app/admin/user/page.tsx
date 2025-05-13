"use client";

import { useEffect, useState } from "react";
import {
  adminDeleteUser,
  adminFindUser,
  adminUpdateUserRole,
  adminUserResetMatching,
} from "../../../api/admin/adminUser";
import UserTable from "../../../components/UserTable";
import { Role } from "../../../enums";

interface User {
  userId: number;
  nickname: string;
  name: string;
  phoneNumber: string;
  studentNumber: string;
  instagramId: string;
  userRole: string;
  userStatus: string;
  matchingGroupId: number;
  matchingType: string;
  gender: string;
  matchingGenderType: string;
}

interface SelectedUsersState {
  matchingType: string;
  matchingGenderType: string;
  userIds: string[];
}

export default function AdminUserPage(): JSX.Element {
  const [nickname, setNickname] = useState("");
  const [userList, setUserList] = useState<User[]>([]);
  const [tempToken, setTempToken] = useState("");

  const [pageNumber, setPageNumber] = useState(0);
  const [lastPageNumber, setLastPageNumber] = useState(0);
  const [visiblePageStart, setVisiblePageStart] = useState(0);
  const visiblePageCount = 5;

  // const [filterType, setFilterType] = useState<"ALL" | "MATCHED" | "PENDING">("ALL");

  const [selectedUsers, setSelectedUsers] = useState<SelectedUsersState>({
    matchingType: "",
    matchingGenderType: "",
    userIds: [],
  });
  // const filteredUserList = userList.filter((user) => {
  //   if (filterType === "ALL") return true;
  //   if (!user.userStatus) return false;
  //   return user.userStatus === filterType;
  // });

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

  const handleSearch = async (status: string = "", pageNumber: number = 0) => {
    try {
      const res = await adminFindUser(tempToken, nickname, status, pageNumber);

      console.log("조회 결과 버튼 클릭:", res);

      if (res.status === 200) {
        setUserList(res.data.content);
        setPageNumber(res.data.pageNumber);
        setLastPageNumber(res.data.totalPages);
        // setSelectedUsers([]); // 페이지 바뀔 때 선택 초기화
      } else {
        alert("사용자 조회 실패");
      }
    } catch (error) {
      console.error("조회 오류:", error);
      alert("조회 중 오류 발생");
    }
  };

  const handleSelectUser = (user: User) => {
    const userIdStr = user.userId.toString();
    const isSelected = selectedUsers.userIds.includes(userIdStr);

    if (isSelected) {
      // 선택 해제
      const updatedIds = selectedUsers.userIds.filter((id) => id !== userIdStr);
      if (updatedIds.length === 0) {
        // 모두 해제되면 초기 상태로
        setSelectedUsers({
          matchingType: "",
          genderMatchingType: "",
          userIds: [],
        });
      } else {
        setSelectedUsers((prev) => ({
          ...prev,
          userIds: updatedIds,
        }));
      }
      return;
    }

    if (selectedUsers.userIds.length >= 4) {
      alert("최대 4명까지만 선택할 수 있습니다.");
      return;
    }

    if (selectedUsers.userIds.length === 0) {
      // 첫 유저 선택 시 기준 설정
      setSelectedUsers({
        matchingType: user.matchingType,
        matchingGenderType: user.matchingGenderType,
        userIds: [userIdStr],
      });
      return;
    }

    // 조건 비교
    if (
      user.matchingType !== selectedUsers.matchingType ||
      user.matchingGenderType !== selectedUsers.matchingGenderType
    ) {
      alert("선택된 유저와 matching 조건이 일치하지 않습니다.");
      return;
    }

    // 정상 추가
    setSelectedUsers((prev) => ({
      ...prev,
      userIds: [...prev.userIds, userIdStr],
    }));
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

  const handleReset = async (userId: number) => {
    if (!confirm("매칭 초기화 하시겠습니까?")) return;
    // 초기화 로직 추가 가능
    try {
      const res = await adminUserResetMatching(tempToken, userId);
      if (res.status === 200) {
        alert("초기화 완료");
        await handleSearch();
      } else {
        alert("초기화 실패");
      }
    } catch (error) {
      console.error("초기화 오류:", error);
      alert("초기화 중 오류 발생");
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


  const handlePrintSelected = () => {
    console.log("선택된 userId:", selectedUsers);
  };

  const handlePrevPage = () => {
    if (pageNumber <= 0) return;
    handleSearch("", pageNumber - 1);
    if (visiblePageStart > 0) {
      setVisiblePageStart((prev) => prev - visiblePageCount);
    }
  };

  const handleNextPage = () => {
    const nextPage = pageNumber + 1;
    if (nextPage >= lastPageNumber) return;
    handleSearch("", nextPage);
    if (nextPage >= visiblePageStart + visiblePageCount) {
      setVisiblePageStart((prev) => prev + visiblePageCount);
    }
  };

  const handleClickPageNumber = (page: number) => {
    handleSearch("", page);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
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

      <div className="flex gap-2 mb-2">
        <button onClick={() => handleSearch()} className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200">전체 보기</button>
        <button onClick={() => handleSearch("MATCHED")} className="px-3 py-1 border rounded bg-blue-100 hover:bg-blue-200">MATCHED</button>
        <button onClick={() => handleSearch("PENDING")} className="px-3 py-1 border rounded bg-yellow-100 hover:bg-yellow-200">PENDING</button>
        <button onClick={handlePrintSelected} className="ml-4 px-3 py-1 border rounded bg-green-100 hover:bg-green-200">선택 콘솔 출력</button>
      </div>

      <UserTable
        users={userList}
        onDelete={handleDelete}
        onChangeRole={handleChangeRole}
        onSelectUser={handleSelectUser}
        onReset={handleReset}
        selectedUserIds={selectedUsers.userIds}
      />

      {lastPageNumber > 1 && (
        <div className="flex items-center gap-4 mt-4">
          <button type="button" onClick={handlePrevPage} className="px-3 py-1 border rounded disabled:opacity-50" disabled={pageNumber === 0}>이전</button>
          {Array.from({ length: visiblePageCount }, (_, i) => {
            const page = visiblePageStart + i;
            if (page >= lastPageNumber) return null;
            return (
              <button
                key={page}
                type="button"
                onClick={() => handleClickPageNumber(page)}
                className={`px-3 py-1 border rounded ${pageNumber === page ? "bg-blue-600 text-white" : "bg-white text-gray-700"}`}
              >
                {page + 1}
              </button>
            );
          })}
          <button type="button" onClick={handleNextPage} className="px-3 py-1 border rounded disabled:opacity-50" disabled={pageNumber >= lastPageNumber - 1}>다음</button>
        </div>
      )}
    </form>
  );
}
