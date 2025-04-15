import api from './axiosInstance';

// 1. 인증번호 요청
export const sendCode = (phoneNumber: string) => {
  return api.post('/sms/send', { phoneNumber });
};

// 2. 인증번호 확인
export const verifyCode = (certificationCode: string) => {
  return api.post('/sms/verify', { certificationCode });
};

// 3. 탈퇴 회원 복원 인증번호 요청
export const restoreSendCode = (phoneNumber: string) => {
  return api.post('/sms/restore/send', { phoneNumber });
};

// 4. 탈퇴 회원 복원 인증번호 확인
export const restoreVerifyCode = (certificationCode: string) => {
  return api.post('/sms/restore/verify', { certificationCode });
};
