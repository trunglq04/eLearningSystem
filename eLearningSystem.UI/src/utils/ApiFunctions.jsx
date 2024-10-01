import client from "./axiosClient";

export const registerLearner = async (data) => {
  return client.post("/auth/register", {
    UserName: data.email,
    Password: data.password,
    ConfirmPassword: data.confirmPassword,
  });
};
