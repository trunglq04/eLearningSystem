import client from "./axiosClient";

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
