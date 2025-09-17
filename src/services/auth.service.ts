import httpClient from "@/shared/api/httpClient.ts";
import type { IAuthResponse } from "src/types/ui/auth";
import { storage } from "@/utils/storage.ts";
import type { IUserProfile } from "@/types/ui/user.ts";

class AuthService {
  private storage = storage;
  async loginWithEri(pkcs7: string) {
    const response = await httpClient<IAuthResponse>({
      url: "auth/login-eimzo",
      open: true,
      method: "POST",
      data: { pkcs7 },
    });
    this.storage.setTokens(response.data.token);
    return response.data;
  }
  async getProfile() {
    const response = await httpClient<IUserProfile>({
      url: "me",
      method: "GET",
    });
    return response.data;
  }
}

const authService = new AuthService();

export default authService;
