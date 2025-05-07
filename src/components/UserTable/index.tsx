import { useEffect, useState } from "react";
import { Role } from "../../enums";

interface User {
  userId: number;
  nickname: string;
  name: string;
  phoneNumber: string;
  instagramId: string;
  userRole: string;
}

const UserTable = ({
  users,
  onDelete,
  onChangeRole,
}: {
  users: User[];
  onDelete: (nickname: string) => void;
  onChangeRole: (userId: number, newRole: keyof typeof Role) => void;
}) => {
  const [roleMap, setRoleMap] = useState<Record<number, string>>({});

  useEffect(() => {
    const initial = Object.fromEntries(users.map((u) => [u.userId, u.userRole]));
    setRoleMap(initial);
  }, [users]);

  const handleSelectChange = (userId: number, newRole: string) => {
    setRoleMap((prev) => ({ ...prev, [userId]: newRole }));
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 text-sm text-center">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">닉네임</th>
            <th className="border px-4 py-2">이름</th>
            <th className="border px-4 py-2">전화번호</th>
            <th className="border px-4 py-2">인스타그램</th>
            <th className="border px-4 py-2">권한 수정</th>
            <th className="border px-4 py-2">유저 삭제</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userId}>
              <td className="border px-4 py-2">{user.userId}</td>
              <td className="border px-4 py-2">{user.nickname}</td>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.phoneNumber}</td>
              <td className="border px-4 py-2">{user.instagramId}</td>
              <td className="border px-4 py-2">
                <select
                  value={roleMap[user.userId] || user.userRole}
                  onChange={(e) =>
                    handleSelectChange(user.userId, e.target.value)
                  }
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
              <td className="border px-4 py-2 flex justify-center gap-2">
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
