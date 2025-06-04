"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getRoomId, joinChatRoom } from "../../api/chat";
import ChatInput from "../../components/ChatInput";
import ChatList from "../../components/ChatList";
import useChat from "../../hooks/useChat";


const ChatPage = () => {
  const [nickname, setNickname] = useState("");
  const [roomId, setRoomId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorCode, setErrorCode] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (errorCode === "C404" || errorCode === "C410" || errorCode === "C500") {
      router.push("/login");
    }
  }, [errorCode, router]);

  // useAuthRedirect(undefined, "/login", "/login");

  // 1. roomId를 받아오고 상태에 저장
  useEffect(() => {
    const tempToken = localStorage.getItem("token");
    if (!tempToken) return;

    // 1. roomId 조회
    getRoomId(tempToken)
      .then(res => {
        const id = res.data; // 또는 res.data.roomId
        setRoomId(id);

        // 2. 채팅방 참여(입장) API 호출
        return joinChatRoom(tempToken, id);
      })
      .then(() => {
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        // 백엔드에서 내려주는 에러 코드에 따라 분기
        if (err?.response?.data?.code) {
          setErrorCode(err.response.data.code);
        } else {
          setErrorCode("UNKNOWN");
        }
      });
  }, []);

  useEffect(() => {
    const nicknameFromStorage = localStorage.getItem("nickname");
    if (nicknameFromStorage) {
      setNickname(nicknameFromStorage);
    } else {
      console.error("닉네임이 로컬 스토리지에 없습니다.");
    }
  }, []);

  const { chatHistory, handleSendMessage } = useChat(roomId || "");

  if (loading) return <div>로딩중...</div>;
  if (!roomId) return <div>채팅방 정보를 불러올 수 없습니다.</div>;

  return (
    <main className="max-w-[1800px] h-[calc(100dvh-90px)] mx-auto flex flex-col gap-4 font-[Pretendard] relative">
      <div className="flex flex-col gap-6 px-6 overflow-y-auto max-h-[calc(100dvh-170px)] h-screen">
        <ChatList chatHistory={chatHistory} nickname={nickname} />
      </div>
      <div className="flex flex-col w-full gap-3 absolute bottom-0">
        <ChatInput onSend={handleSendMessage} />
      </div>
    </main>
  );
};

export default ChatPage;