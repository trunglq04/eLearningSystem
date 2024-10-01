import client from "./AxiosClient";

export const login = async (email, password) => {
  return client.post("/auth/login", { username: email, password });
};
