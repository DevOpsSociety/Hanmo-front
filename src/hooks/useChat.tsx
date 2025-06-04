import { Client, IMessage } from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { getChatHistory, sendMessage } from "../api/chat";

// 채팅 메시지 타입 정의
interface ChatMessage {
  roomId: string;
  senderId: number;
  senderNickname: string;
  content: string;
  sentAt: string;
}

// 채팅 WebSocket 커스텀 훅
export default function useChat(roomId: string) {
  const wsUrl = process.env.NEXT_PUBLIC_API_WS_URL || "";

  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const clientRef = useRef<Client | null>(null);

  // 1. 채팅 기록 불러오기
  useEffect(() => {
    if (!roomId) return;
    const tempToken = localStorage.getItem("token");
    if (!tempToken) return;

    getChatHistory(tempToken, roomId)
      .then(res => {
        console.log("채팅 기록 불러오기 응답:", res);
        setChatHistory(res.data); // 백엔드 응답 구조에 따라 res.data.messages 등으로 수정
      })
      .catch(() => setChatHistory([]));
  }, [roomId]);


  useEffect(() => {
    if (!roomId) return; // roomId 없으면 연결하지 않음

    const client = new Client({
      webSocketFactory: () => new SockJS(wsUrl),
      reconnectDelay: 5000,
      onConnect: () => {
        client.subscribe(`/topic/chat/${roomId}`, (message: IMessage) => {
          const msg = JSON.parse(message.body);
          setChatHistory((prev) => [...prev, msg]);
        });
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, [roomId, wsUrl]);

  // 메시지 전송 함수
  const handleSendMessage = async (msg: object) => {
    // console.log("Sending message:", msg);

    const tempToken = localStorage.getItem("token");
    if (!tempToken) {
      alert("로그인이 필요합니다.");
      return;
    }
    try {
      await sendMessage(tempToken, roomId, msg);
      // 필요하다면 전송 후 채팅 내역을 새로고침하거나, 낙관적 업데이트 가능
    } catch {
      alert("메시지 전송에 실패했습니다.");
    }

  };

  // 채팅 내역과 메시지 전송 함수 반환
  return { chatHistory, handleSendMessage };
}