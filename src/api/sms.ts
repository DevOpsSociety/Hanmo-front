import api from './axiosInstance';

// 1. 인증번호 요청
export const sendCode = (phoneNumber: string) => {
  return api.post('/sms/send', { phoneNumber });
};

// 2. 인증번호 확인
export const verifyCode = (certificationCode: string) => {
  return api.post('/sms/verify', { certificationCode });
};
