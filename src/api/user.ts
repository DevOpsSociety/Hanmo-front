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
