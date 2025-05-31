import { useEffect, useRef, useState } from "react";
import { connectChatSocket, getChatHistory, getRoomId, joinChatRoom, sendMessage } from "../api/chat";


interface ChatMessage {
  roomId: string;
  senderId: number;
  senderNickname: string;
  content: string;
  sentAt: string;
}

export function useChat(wsUrl?: string) {
  const [token, setToken] = useState<string>("");
  const [roomId, setRoomId] = useState<string>("");
  const socketRef = useRef<WebSocket | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      roomId: "77",
      senderId: 205,
      senderNickname: "신학의 귀여운 토토로",
      content: "하이",
      sentAt: "2025-05-31T16:56:20.080109037"
    },
    {
      roomId: "77",
      senderId: 205,
      senderNickname: "컴공의 귀여운 토토로",
      content: "반가워용",
      sentAt: "2025-05-31T16:56:20.080109037"
    },
  ]);

  // 토큰 및 채팅방 초기화
  useEffect(() => {
    const temptoken = localStorage.getItem("token");
    if (temptoken) setToken(temptoken);

    async function fetchRoomIdAndJoin() {
      if (!temptoken) return;
      try {
        const res = await getRoomId(temptoken);
        const roomId = res.data;
        setRoomId(roomId);
        await joinChatRoom(temptoken, roomId);
        const historyRes = await getChatHistory(temptoken, roomId);
        setChatHistory(historyRes.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchRoomIdAndJoin();
  }, []);

  // WebSocket 연결 (실시간 채팅이 필요할 때)
  useEffect(() => {
    if (!wsUrl || !roomId) return;
    socketRef.current = connectChatSocket(wsUrl);

    socketRef.current.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      setChatHistory((prev) => [...prev, msg]);
    };

    return () => {
      socketRef.current?.close();
    };
  }, [wsUrl, roomId]);

  // 메시지 전송
  const handleSendMessage = async (content: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      // WebSocket 실시간 전송
      socketRef.current.send(JSON.stringify({ roomId, content, token }));
    } else if (token && roomId) {
      // REST API 전송
      await sendMessage(token, roomId, content);
      const historyRes = await getChatHistory(token, roomId);
      setChatHistory(historyRes.data);
    }
  };

  return { roomId, chatHistory, handleSendMessage };
}