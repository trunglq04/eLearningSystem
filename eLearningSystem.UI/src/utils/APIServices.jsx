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

export const getUser = async () => {
  return client.get("/user", { headers: getHeader() });
};

export const updateProfile = async (data) => {
  return client.post(
    "/user",
    {
      email: data.email,
      fullName: data.fullname,
      dateOfBirth: data.dob,
      gender: data.gender,
      phoneNumber: data.phone,
    },
    { headers: getHeader() }
  );
};

export const updateAvatar = async (formData) => {
  return client.post("/user/upload-avatar", formData, {
    headers: {
      ...getHeader(),
      "Content-Type": "multipart/form-data",
    },
  });
};

export const addTutor = async (data) => {
  return client.post(
    "/user/register",
    { UserName: data.email, FullName: data.fullname },
    { headers: getHeader() }
  );
};

export const getActors = async (role, page) => {
  return client.get(
    `/user/get?role=${role}&pageNumber=${page}&pageSize=4`,

    { headers: getHeader() }
  );
};
