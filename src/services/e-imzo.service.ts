import httpClient from "@/shared/api/httpClient.ts";
import type { IChallengeResponse } from "@/types/ui/auth.ts";
import type { ITimestamp } from "@/types/global/e-imzo.ts";

class EImzoService {
  async getChallenge() {
    const response = await httpClient<IChallengeResponse>({
      prefix: "/e-imzo",
      url: "frontend/challenge",
      open: true,
    });
    return response.data;
  }
  async getTimestamp(pkcs7: string) {
    const response = await httpClient<ITimestamp>({
      prefix: "/e-imzo",
      url: "frontend/timestamp/pkcs7",
      open: true,
      method: "POST",
      headers: {
        "Content-type": "text/plain",
      },
      data: pkcs7,
    });
    return response.data;
  }
}

const eImzoService = new EImzoService();

export default eImzoService;
