import api from "../axiosInstance";

export const loginAdminUser = (payload: {
  loginId: string;
  loginPw: string;
  phoneNumber: string;
}) => {
  return api.post("/admin/login", payload);
};

export const signupAdminUser = (payload: {
  loginId: string;
  loginPw: string;
  phoneNumber: string;
}) => {
  return api.put("/admin/signup", payload);
};

export const adminFindUser = (tempToken: string, keyword: string, status: string, page: number = 0) => {
  return api.get("/admin/search", {
    params: {
      keyword,
      status,
      page
    },
    headers: {
      tempToken: tempToken,
    },
  });
};

export const adminDeleteUser = (tempToken: string, nickname: string) => {
  return api.delete(`/admin/${nickname}`, {
    headers: {
      tempToken: tempToken,
    },
  });
};

export const adminFindMatchingGroups = (tempToken: string) => {
  return api.get(`/admin/matching-count`, {
    headers: {
      tempToken: tempToken,
    },
  });
};

export const adminFindUserSignupCount = (tempToken: string) => {
  return api.get(`/admin/signup-count`, {
    headers: {
      tempToken: tempToken,
    },
  });
};

export const adminUpdateUserRole = (tempToken: string, userId: number, newRole: string) => {
  return api.put(`/admin/role`, { userId, newRole }, {
    headers: {
      tempToken: tempToken,
    },
  });
};

export const adminFindMatchingQueueStatus = (tempToken: string) => {
  return api.get(`/admin/queue-status`, {
    headers: {
      tempToken: tempToken,
    },
  });
};

export const adminUserResetMatching = (tempToken: string, userId: number) => {
  return api.patch(`/admin/reset-matching/${userId}`, {}, {
    headers: {
      tempToken: tempToken,
    },
  });
};

export const adminUserManualMatching = (tempToken: string, payload: {
  matchingType: string,
  genderMatchingType: string,
  userIds: string[],
}) => {
  return api.post(`/admin/manual-match`, payload, {
    headers: {
      tempToken: tempToken,
    },
  });
};