interface ChatMessage {
  senderNickname: string;
  content: string;
  sentAt: string;
}

interface ChatListProps {
  chatHistory: ChatMessage[];
  nickname: string;
}

export default function ChatList({ chatHistory, nickname }: ChatListProps) {
  return (
    <>
      {chatHistory.map((msg, idx) => {
        const isMine = msg.senderNickname === nickname;
        return (
          <div
            key={idx}
            className={`flex flex-col ${isMine ? "items-end" : "items-start"}`}
          >
            {/* 닉네임 */}
            <div
              className={`font-bold text-[#134D80] mb-1 ${isMine ? "text-right" : "text-left"
                }`}
            >
              {msg.senderNickname}
            </div>
            {/* 메시지 + 시간 */}
            <div
              className={`flex items-end gap-2 ${isMine ? "flex-row-reverse" : ""
                }`}
            >
              {/* 메시지 */}
              <div
                className={`w-fit border rounded-bl-[20px] rounded-br-[20px] rounded-tr-[20px] rounded-tl-none p-3 text-sm font-semibold text-white
                  ${isMine ? "bg-[#134D80]" : "bg-[#AACCEC]"}
                `}
              >
                {msg.content}
              </div>
              {/* 시간 */}
              <span
                className={`text-[10px] text-[#a6a6a6] ${isMine ? "order-2 mr-2" : ""
                  }`}
              >
                {msg.sentAt}
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
}