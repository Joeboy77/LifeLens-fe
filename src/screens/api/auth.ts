import api from "./apiConfig";

export const login = async (email: string, password: string) => {
  return api.post("/auth/login", { email, password });
};

export const signup = async (email: string, password: string, fullName: string) => {
  return api.post("/auth/signup", { email, password, fullName });
};

export const logout = async () => {
  return api.post("/auth/logout");
};

export const getCurrentUser = async () => {
  return api.get("/auth/welcome");
};
