import type { IBaseResponse } from "@/types/global";
import httpClient from "@/shared/api/httpClient.ts";
import type { ITimestamp } from "@/types/global/e-imzo.ts";

class BranchManagerService {
  async signGuarantee(
    id: number,
    timestamp: ITimestamp,
  ): Promise<IBaseResponse> {
    const response = await httpClient<IBaseResponse>({
      url: `upr-branch/guarantees/${id}/sign`,
      method: "POST",
      headers: {
        "Content-type": "text/plain",
      },
      data: timestamp.pkcs7b64,
    });

    return response.data;
  }
  async returnGuarantee(id: number, comment: string) {
    const response = await httpClient<IBaseResponse>({
      url: `upr-branch/guarantees/${id}/cancel`,
      method: "POST",
      data: { comment },
    });

    return response.data;
  }
}

const branchManagerService = new BranchManagerService();

export default branchManagerService;
