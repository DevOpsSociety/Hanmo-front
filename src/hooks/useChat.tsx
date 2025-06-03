import { Client, IMessage } from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";

// 채팅 메시지 타입 정의
interface ChatMessage {
  roomId: string;
  senderId: number;
  senderNickname: string;
  content: string;
  sentAt: string;
}

// 채팅 WebSocket 커스텀 훅
export default function useChat(
  wsUrl = process.env.NEXT_PUBLIC_WS_URL || ""
) {
  // 채팅 내역 상태
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      roomId: "77",
      senderId: 2,
      senderNickname: "Bob",
      content: "안녕하세요!",
      sentAt: "2025-06-03T17:17:13.913Z",
    },
    {
      roomId: "77",
      senderId: 1,
      senderNickname: "신학의 귀여운 토토로",
      content: "오늘 날씨가 참 좋아요.",
      sentAt: "2025-06-03T17:18:00.000Z",
    },
    {
      roomId: "77",
      senderId: 4,
      senderNickname: "Diana",
      content: "다들 점심 뭐 드셨나요?",
      sentAt: "2025-06-03T17:19:10.000Z",
    },
    {
      roomId: "77",
      senderId: 3,
      senderNickname: "Charlie",
      content: "저는 김치찌개 먹었어요.",
      sentAt: "2025-06-03T17:20:20.000Z",
    },
    {
      roomId: "77",
      senderId: 1,
      senderNickname: "신학의 귀여운 토토로",
      content: "맛있겠네요!",
      sentAt: "2025-06-03T17:21:30.000Z",
    },
    {
      roomId: "77",
      senderId: 4,
      senderNickname: "Diana",
      content: "저는 샐러드 먹었어요.",
      sentAt: "2025-06-03T17:22:10.000Z",
    },
    {
      roomId: "77",
      senderId: 2,
      senderNickname: "Bob",
      content: "오늘 회의는 몇 시에 시작하나요?",
      sentAt: "2025-06-03T17:23:05.000Z",
    },
    {
      roomId: "77",
      senderId: 3,
      senderNickname: "Charlie",
      content: "3시에 시작합니다.",
      sentAt: "2025-06-03T17:24:00.000Z",
    },
    {
      roomId: "77",
      senderId: 1,
      senderNickname: "신학의 귀여운 토토로",
      content: "알겠습니다. 감사합니다!",
      sentAt: "2025-06-03T17:25:10.000Z",
    },
    {
      roomId: "77",
      senderId: 2,
      senderNickname: "Bob",
      content: "모두 화이팅입니다!",
      sentAt: "2025-06-03T17:26:00.000Z",
    },
  ]);
  // ...existing code...
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    // STOMP 클라이언트 생성 및 설정
    const client = new Client({
      // SockJS를 이용해 WebSocket 연결 생성
      webSocketFactory: () => new SockJS(wsUrl),
      // 연결이 끊겼을 때 5초 후 재연결 시도
      reconnectDelay: 5000,
      // 연결 성공 시 실행되는 콜백
      onConnect: () => {
        // 채팅방 구독: 메시지 수신 시 chatHistory에 추가
        client.subscribe("/topic/chat/1", (message: IMessage) => {
          const msg = JSON.parse(message.body);
          setChatHistory((prev) => [...prev, msg]);
        });
      },
    });

    // WebSocket 연결 시작
    client.activate();
    // 클라이언트 인스턴스 ref에 저장
    clientRef.current = client;

    // 컴포넌트 언마운트 시 연결 해제
    return () => {
      client.deactivate();
    };
  }, [wsUrl]);

  // 메시지 전송 함수
  const handleSendMessage = (msg: object) => {
    clientRef.current?.publish({
      destination: "/app/chat.send/1", // 서버로 메시지 전송 경로
      body: JSON.stringify(msg),
    });
  };

  // 채팅 내역과 메시지 전송 함수 반환
  return { chatHistory, handleSendMessage };
}