import type {
  IGuarantee,
  IGuarantyForm,
  TOnlyOfficeMode,
} from "@/types/ui/guarantees.ts";
import httpClient from "@/shared/api/httpClient.ts";
import type { IBaseResponse } from "@/types/global";
import type { IOnlyOfficeConfig } from "@/types/global/only-office-config.ts";

class ClientManagerService {
  async createGuarantee(form: IGuarantyForm): Promise<IBaseResponse> {
    const response = await httpClient<IBaseResponse>({
      url: "guarantees/create",
      method: "POST",
      data: form,
    });

    return response.data;
  }

  async getOnlyOfficeConfig(id: number, mode: TOnlyOfficeMode = "edit") {
    const response = await httpClient<IOnlyOfficeConfig>({
      url: `docx/${id}/onlyoffice-config?mode=${mode}`,
      method: "GET",
    });
    return response.data;
  }

  async sentToMainBank(id: number) {
    const response = await httpClient<IOnlyOfficeConfig>({
      url: `guarantees/${id}/send-to-main-bank`,
      method: "POST",
    });
    return response.data;
  }

  async resentToMainBank(id: number) {
    const response = await httpClient<IOnlyOfficeConfig>({
      url: `client-manager/guarantees/${id}/resend`,
      method: "POST",
    });
    return response.data;
  }
  async printed(id: number) {
    await httpClient({
      url: `client-manager/guarantees/${id}/mark-printed`,
      method: "POST",
    });
  }
  async getGuaranteeDetails(id: number) {
    const response = await httpClient<IGuarantee>({
      url: `guarantees/${id}/details`,
      method: "GET",
    });
    return response.data;
  }
}
const clientManagerService = new ClientManagerService();

export default clientManagerService;
