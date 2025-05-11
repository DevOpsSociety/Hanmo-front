import { useEffect, useState } from "react";
import { Role } from "../../enums";

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
  genderMatchingType: string;
}

interface Props {
  users: User[];
  onDelete: (nickname: string) => void;
  onChangeRole: (userId: number, newRole: keyof typeof Role) => void;
  onReset: (userId: number) => void;
  selectedUserIds: number[];
  onSelectUser: (userId: number) => void;
}

const UserTable = ({
  users,
  onDelete,
  onChangeRole,
  onReset,
  selectedUserIds,
  onSelectUser,
}: Props) => {
  const [roleMap, setRoleMap] = useState<Record<number, string>>({});

  useEffect(() => {
    const initial = Object.fromEntries(users.map((u) => [u.userId, u.userRole]));
    setRoleMap(initial);
  }, [users]);

  const handleSelectChange = (userId: number, newRole: string) => {
    setRoleMap((prev) => ({ ...prev, [userId]: newRole }));
  };

  return (
    <div className="overflow-y-auto overflow-x-auto w-[80%] max-h-[70dvh] border border-gray-300 rounded">
      <table className="min-w-full text-sm text-center border-collapse">
        <thead className="sticky top-0 z-20 bg-white shadow-md">
          <tr>
            <th className="px-2 py-2">✔</th>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2 w-[120px]">닉네임</th>
            <th className="px-4 py-2">이름</th>
            <th className="px-4 py-2">전화번호</th>
            <th className="px-4 py-2">학번</th>
            <th className="px-4 py-2">인스타그램</th>
            <th className="px-4 py-2">상태</th>
            <th className="px-4 py-2">매칭 타입</th>
            <th className="px-2 py-1">매칭 그룹 ID</th>
            <th className="px-4 py-2">성별</th>
            <th className="px-4 py-2 w-[90px]">매칭 초기화</th>
            <th className="px-4 py-2">권한 수정</th>
            <th className="px-4 py-2">유저 삭제</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.userId}
              className={`hover:bg-gray-100 ${selectedUserIds.includes(user.userId) ? "bg-yellow-50" : ""}`}
            >
              <td className="border-t px-2 py-2">
                <input
                  type="checkbox"
                  checked={selectedUserIds.includes(user.userId)}
                  onChange={() => onSelectUser(user.userId)}
                  className="w-6 h-6"
                />
              </td>
              <td className="border-t px-4 py-2">{user.userId}</td>
              <td className="border-t px-4 py-2">{user.nickname}</td>
              <td className="border-t px-4 py-2">{user.name}</td>
              <td className="border-t px-4 py-2">{user.phoneNumber}</td>
              <td className="border-t px-4 py-2">{user.studentNumber}</td>
              <td className="border-t px-4 py-2">{user.instagramId}</td>
              <td className="border-t px-4 py-2">{user.userStatus}</td>
              <td className="border-t px-4 py-2">{user.matchingType}</td>
              <td className="border-t px-4 py-2">{user.matchingGroupId}</td>
              <td className="border-t px-4 py-2">{user.gender}</td>
              <td className="border-t px-4 py-2">
                <button
                  onClick={() => {
                    console.log("초기화 버튼 클릭", user.userId);
                    onReset(user.userId);
                  }}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  초기화
                </button>
              </td>
              <td className="border-t px-4 py-2">
                <select
                  value={roleMap[user.userId] || user.userRole}
                  onChange={(e) => handleSelectChange(user.userId, e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
                <button
                  onClick={() =>
                    onChangeRole(user.userId, roleMap[user.userId] as keyof typeof Role)
                  }
                  className="bg-green-500 text-white px-2 py-1 rounded ml-2"
                >
                  변경
                </button>
              </td>
              <td className="border-t px-4 py-2">
                <button
                  onClick={() => onDelete(user.nickname)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
