import api from './axiosInstance';

// 1. 간편 회원가입
export const signUpUser = (payload: {
  name: string;
  phoneNumber: string;
  studentNumber: string;
  gender: string;
  mbti: string;
  department: string;
  instagramId: string;
}) => {
  return api.post('/users/signup', payload);
};

// 2. 간편 로그인
export const loginUser = (payload: {
  phoneNumber: string;
  studentNumber: string;
}) => {
  return api.post('/users/login', payload);
};

// 3. 1회 닉네임 변경
export const changeNickname = (nickname: string) => {
  return api.post('/users/nickname', { nickname });
};

// 4. 회원 탈퇴
export const deleteUser = (phoneNumber: string) => {
  return api.delete(`/users/withdraw`, {
    params: { phoneNumber },
  });
};

// 5. 유저 조회
export const findUser = (tempToken: string) => {
  return api.get('/users/profile', {
    headers: {
      tempToken: tempToken, // Authorization 헤더에 토큰 추가
    },
  });
};

// // 6. 탈퇴 회원 복원
// export const restoreUser = (phoneNumber: string) => {
//   return api.post('/users/restore', null, {
//     params: { phoneNumber },
//   });
// };
