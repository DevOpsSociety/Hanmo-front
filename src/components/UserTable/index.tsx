
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
}: {
  users: User[];
  onDelete: (nickname: string) => void;
}) => {


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
            <th className="border px-4 py-2">권한</th>
            <th className="border px-4 py-2">삭제</th>
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
              <td className="border px-4 py-2">{user.userRole}</td>
              <td className="border px-4 py-2">
                <button className="border border-black px-1" onClick={() => onDelete(user.nickname)}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
