import { Client, IMessage } from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";

// 채팅 메시지 타입 정의
interface ChatMessage {
  id?: string;
  content: string;
  sender: string;
  timestamp?: string;
}

// 채팅 WebSocket 커스텀 훅
export default function useChat(
  wsUrl = process.env.NEXT_PUBLIC_WS_URL || ""
) {
  // 채팅 내역 상태
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  // STOMP 클라이언트 인스턴스 저장용 ref
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