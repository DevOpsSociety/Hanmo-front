import api from "../axiosInstance";

export const loginAdminUser = (payload: {
  loginId: string;
  loginPw: string;
  phoneNumber: string;
}) => {
  return api.post("/users/login/admin", payload);
}

export const signupAdminUser = (payload: {
  loginId: string;
  loginPw: string;
  phoneNumber: string;
}) => {
  return api.put("/users/signup/admin", payload);
} 
