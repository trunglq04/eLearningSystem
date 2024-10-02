import client from "./axiosClient";

export const getHeader = () => {
  const token = JSON.parse(localStorage.getItem("accessToken"));
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export const registerLearner = async (data) => {
  return client.post("/auth/register", {
    UserName: data.email,
    Password: data.password,
    ConfirmPassword: data.confirmPassword,
  });
};

export const confirmEmail = async (email, token) => {
  return client.post("/auth/confirm-email", {
    email: email,
    token: token,
  });
};

export const login = async (email, password) => {
  return client.post("/auth/login", { username: email, password });
};

export const forgotPassword = async (email) => {
  return client.post("/password/forgot-password", { Email: email });
};

export const resetPassword = async ({ email, password, resetToken }) => {
  return client.post("/password/reset-password", {
    Email: email,
    NewPassword: password,
    ResetToken: resetToken,
  });
};

export const changePassword = async ({ newPassword, confirmNewPassword }) => {
  return client.post(
    "/password/change-password",
    {
      NewPassword: newPassword,
      ConfirmPassword: confirmNewPassword,
    },
    { headers: getHeader() }
  );
};
