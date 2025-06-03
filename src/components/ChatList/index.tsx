import { useEffect, useRef, useState } from "react";
import ReportModal from "../ReportModal";

interface ChatMessage {
  roomId: string;
  senderId: number;
  senderNickname: string;
  content: string;
  sentAt: string;
}


interface ChatListProps {
  chatHistory: ChatMessage[];
  nickname: string;
}

export default function ChatList({ chatHistory, nickname }: ChatListProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);


  const [reportOpen, setReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  }, [chatHistory]);

  return (
    <div>
      <div>
        <div className="flex flex-col text-center text-[13px] items-center">
          <div className="text-[#A6A6A6] py-8">
            4인 채팅이 시작되었어요! <br />
            남은 시간에 유의하세요.
          </div>
          <div className="w-[100px] h-8 rounded-[20px] bg-[#134D80] text-white flex items-center justify-center">
            2025. 06. 03
          </div>
        </div>
        {chatHistory.map((msg, idx) => {
          const isMine = msg.senderNickname === nickname;
          return (
            <div
              key={idx}
              className={`flex flex-col py-1 ${isMine ? "items-end" : "items-start"}`}
            >
              {/* 닉네임 */}
              <div
                className={`font-bold text-[#134D80] mb-1 ${isMine ? "text-right" : "text-left"
                  }`}
              >
                {isMine || msg.senderNickname}
              </div>
              {/* 메시지 + 시간 */}
              <div
                className={`flex items-end gap-2 ${isMine ? "flex-row-reverse" : ""
                  }`}
              >
                {/* 메시지 */}
                <div
                  className={`w-fit border rounded-bl-[20px] rounded-br-[20px] p-3 text-sm font-semibold text-white
                  ${isMine ? "bg-[#134D80] rounded-tr-none rounded-tl-[20px]" : "bg-[#AACCEC] rounded-tr-[20px] rounded-tl-none"}
                `}
                >
                  {msg.content}
                </div>
                {/* 시간 */}
                <div
                  className={`text-[10px] text-[#a6a6a6] ${isMine ? "order-2 mr-2" : ""
                    }`}>
                  <span>
                    {new Date(msg.sentAt).toLocaleTimeString("ko-KR", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </span>
                  {isMine || <>
                    <span> | </span>
                    <button
                      onClick={() => setReportOpen(true)}
                    >
                      신고
                    </button>
                  </>
                  }
                  <ReportModal
                    open={reportOpen}
                    onClose={() => setReportOpen(false)}
                    onSubmit={() => {
                      // 신고 처리 로직
                      alert("신고가 접수되었습니다.");
                      setReportOpen(false);
                    }}
                    reason={reportReason}
                    setReason={setReportReason}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div ref={bottomRef} />
    </div>
  );
}