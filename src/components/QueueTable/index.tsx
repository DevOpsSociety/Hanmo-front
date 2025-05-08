import { Role } from "../../enums";

interface List {
  genderMatchingType: string;
  matchingType: string;
  waitingCount: number;
}

const QueueTable = ({
  lists,
}: {
  lists: List[];
  onDelete: (nickname: string) => void;
  onChangeRole: (userId: number, newRole: keyof typeof Role) => void;
}) => {


  return (
    <div className="overflow-y-auto max-h-[70dvh] border border-gray-300 rounded">
      <table className="min-w-full text-sm text-center border-collapse">
        <thead className="sticky top-0 z-20 bg-white shadow-md">
          <tr>
            <th className="px-4 py-2">성별 매칭 타입</th>
            <th className="px-4 py-2">매칭 타입</th>
            <th className="px-4 py-2">대기 카운트</th>
          </tr>
        </thead>
        <tbody>
          {lists.map((list, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border-t px-4 py-2">{list.genderMatchingType === "SAME_GENDER" ? "동성" : "이성"}</td>
              <td className="border-t px-4 py-2">{list.matchingType === "ONE_TO_ONE" ? "1:1 매칭" : "2:2 매칭"}</td>
              <td className="border-t px-4 py-2">{list.waitingCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QueueTable;
