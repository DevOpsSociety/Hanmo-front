"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getRoomInfo } from "../../api/chat";
import ChatInput from "../../components/ChatInput";
import ChatList from "../../components/ChatList";
import useChat from "../../hooks/useChat";
import { setCreatedAt } from "../../store/chatSlice";


const ChatPage = () => {
  const [nickname, setNickname] = useState("");
  const [roomId, setRoomId] = useState<string | null>(null);
  const [participants, setParticipants] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [errorCode, setErrorCode] = useState<string | null>(null);

  // const router = useRouter();
  const dispatch = useDispatch();

  // useAuthRedirect(undefined, "/login", "/login");

  useEffect(() => {
    console.log("participants 상태가 변경됨:", participants);
  }, [participants]);

  // 1. roomId를 받아오고 상태에 저장
  useEffect(() => {
    const tempToken = localStorage.getItem("token");
    if (!tempToken) return;

    getRoomInfo(tempToken)
      .then(res => {
        const { roomId, createdAt, participantCount } = res.data;
        console.log("채팅방 정보:", res);

        setRoomId(roomId);
        dispatch(setCreatedAt(createdAt));
        setParticipants(participantCount);

        // return joinChatRoom(tempToken, roomId);
      })
      .then(() => {
        setLoading(false);
      })
      .catch(err => {
        console.error("백엔드 에러:", err);
        setLoading(false);

        if (err?.response?.data.errorCode) {
          setErrorCode(err?.response?.data.errorCode);
          console.error("서버 내부 오류 발생");
        } else {
          setErrorCode("UNKNOWN");
        }
      });
  }, [dispatch]);

  // useEffect(() => {
  //   if (!errorCode) return;
  //   console.log("에러 코드:", errorCode);
  //   if (errorCode === "C404") {
  //     router.push("/main");
  //   } else if (["C410", "C500"].includes(errorCode)) {
  //     router.push("/login");
  //   }
  // }, [errorCode, router]);

  useEffect(() => {
    const nicknameFromStorage = localStorage.getItem("nickname");
    if (nicknameFromStorage) {
      setNickname(nicknameFromStorage);
    } else {
      console.error("닉네임이 로컬 스토리지에 없습니다.");
    }
  }, []);

  const { chatHistory, handleSendMessage } = useChat(roomId || "");

  console.log("에러 코드 :", errorCode);

  if (loading) return <div>로딩중...</div>;
  if (errorCode === "SERVER_ERROR") return <div>서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.</div>;
  if (errorCode === "C404") return <div>채팅방을 찾을 수 없습니다.</div>;
  if (errorCode === "C410") return <div>채팅방이 만료되었습니다.</div>;
  if (errorCode === "C500") return <div>채팅방 생성 또는 메시지 전송에 실패했습니다.</div>;
  if (!roomId) return <div>채팅방 정보를 불러올 수 없습니다.</div>;


  return (
    <main className="max-w-[1800px] h-[calc(100dvh-90px)] mx-auto flex flex-col gap-4 font-[Pretendard] relative">
      <div className="flex flex-col gap-6 px-6 overflow-y-auto max-h-[calc(100dvh-170px)] h-screen">
        <ChatList chatHistory={chatHistory} nickname={nickname} participants={participants} />
      </div>
      <div className="flex flex-col w-full gap-3 absolute bottom-0">
        <ChatInput onSend={handleSendMessage} />
      </div>
    </main>
  );
};

export default ChatPage;