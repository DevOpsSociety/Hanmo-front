import api from "../axiosInstance";

export const loginAdminUser = (payload: {
  loginId: string;
  loginPw: string;
  phoneNumber: string;
}) => {
  return api.post("/admin/login", payload);
}

export const signupAdminUser = (payload: {
  loginId: string;
  loginPw: string;
  phoneNumber: string;
}) => {
  return api.put("/admin/signup", payload);
}

export const adminFindUser = (tempToken: string, nickname: string) => {
  return api.get("/admin/search", {
    params: {
      nickname
    },
    headers: {
      tempToken: tempToken,
    },
  });
}

export const adminDeleteUser = (tempToken: string, nickname: string) => {
  return api.delete(`/admin/${nickname}`, {
    headers: {
      tempToken: tempToken,
    },
  });
}

export const adminFindMatchingGroups = (tempToken: string) => {
  return api.get(`/admin/matching-count`, {
    headers: {
      tempToken: tempToken,
    },
  });
}

export const adminFindUserSignupCount = (tempToken: string) => {
  return api.get(`/admin/signup-count`, {
    headers: {
      tempToken: tempToken,
    },
  });
}