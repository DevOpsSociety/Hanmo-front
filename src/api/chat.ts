import api from "./axiosInstance";

// 1. 채팅방 ID 조회
export const getRoomId = (tempToken: string) => {
  return api.get("/chat/rooms/my-room", {
    headers: {
      tempToken: tempToken,
    },
  });
};

// 2. 채팅방 참여
export const joinChatRoom = (
  tempToken: string,
  roomId: string
) => {
  return api.post(
    `/chat/rooms/${roomId}/join`,
    {},
    {
      headers: {
        tempToken: tempToken,
      },
    }
  );
};
// 2. 채팅방 참여 (백엔드 api 변동 시 이것으로 교체)
// export const getChatHistory = (
//   tempToken: string,
//   roomId: string
// ) => {
//   return api.get(
//     `/chat/rooms/${roomId}/get-history`,
//     {
//       headers: {
//         tempToken: tempToken,
//       },
//     }
//   );
// };

// 3. 채팅 메시지 전송
export const sendMessage = (
  tempToken: string,
  roomId: string,
  content: string
) => {
  return api.post(
    `/chat/rooms/${roomId}/send-message`,
    { content },
    {
      headers: {
        tempToken: tempToken,
      },
    }
  );
};

// 4. 채팅 메시지 조회
export const getChatHistory = (
  tempToken: string,
  roomId: string
) => {
  return api.get(
    `/chat/rooms/${roomId}/get-history`,
    {
      headers: {
        tempToken: tempToken,
      },
    }
  );
};


export const connectChatSocket = (wsUrl: string) => new WebSocket(wsUrl);