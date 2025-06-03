"use client";

import { useEffect, useState } from "react";
import ChatInput from "../../components/ChatInput";
import ChatList from "../../components/ChatList";
import useChat from "../../hooks/useChat";

const ChatPage = () => {
  const { chatHistory, handleSendMessage } = useChat(); // wsUrl 필요시 전달
  const [nickname, setNickname] = useState("");

  // useAuthRedirect(undefined, "/login", "/login");

  useEffect(() => {
    const nicknameFromStorage = localStorage.getItem("nickname");
    if (nicknameFromStorage) {
      setNickname(nicknameFromStorage);
    } else {
      console.error("닉네임이 로컬 스토리지에 없습니다.");
    }
  }, []);

  return (
    <div className="max-w-[393px] h-[calc(100dvh-90px)] mx-auto flex flex-col gap-4 font-[Pretendard] relative">
      <div className="flex flex-col gap-6 px-6 overflow-y-auto max-h-[calc(100dvh-170px)] border-4 h-screen">
        <ChatList chatHistory={chatHistory} nickname={nickname} />
      </div>
      <div className="flex flex-col w-full gap-3 absolute bottom-0">
        <ChatInput onSend={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatPage;