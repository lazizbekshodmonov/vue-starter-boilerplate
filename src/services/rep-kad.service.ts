import type { IBaseResponse } from "@/types/global";
import httpClient from "@/shared/api/httpClient.ts";
import type { IGuarantee } from "@/types/ui/guarantees.ts";

class RepKadService {
  async approveGuarantee(id: number) {
    const response = await httpClient<IBaseResponse>({
      url: `rep-kad/guarantees/${id}/approve`,
      method: "POST",
    });

    return response.data;
  }
  async returnGuarantee(id: number, comment: string) {
    const response = await httpClient<IBaseResponse>({
      url: `rep-kad/guarantees/${id}/return`,
      method: "POST",
      data: { comment },
    });

    return response.data;
  }

  async getGuaranteeDetails(id: number) {
    const response = await httpClient<IGuarantee>({
      url: `guarantees/${id}/details`,
      method: "GET",
    });
    return response.data;
  }
}

const repKadService = new RepKadService();

export default repKadService;
