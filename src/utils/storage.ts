export const storage = {
  setTokens(token: string) {
    localStorage.setItem("token", token);
  },

  getToken() {
    return localStorage.getItem("token");
  },

  clearTokens() {
    localStorage.clear();
  },
};
