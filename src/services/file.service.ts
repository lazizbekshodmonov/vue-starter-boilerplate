import SHA256 from "crypto-js/sha256";
import CryptoJS from "crypto-js";
import externalHttpClient from "@/shared/api/externalClient.ts";
import { envConfig } from "@/config/env.ts";
import { storage } from "@/utils/storage.ts";

const { getToken } = storage;
class FileService {
  async getFileSHA256(url: string) {
    const token = getToken();
    const response = await externalHttpClient<BufferSource>({
      url: `${envConfig.apiBaseUrl}${url}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
      responseType: "arraybuffer",
    });

    const wordArray = CryptoJS.lib.WordArray.create(
      new Uint8Array(response.data as ArrayBuffer),
    );
    const hash = SHA256(wordArray);

    return CryptoJS.enc.Base64.stringify(hash);
  }
  async getPdfObjectUrl(url: string): Promise<string> {
    const token = getToken();
    const response = await externalHttpClient<ArrayBuffer>({
      url: `${envConfig.apiBaseUrl}${url}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
      responseType: "arraybuffer",
    });

    const blob = new Blob([response.data], { type: "application/pdf" });

    if (blob.type !== "application/pdf") {
      throw new Error("Bu fayl PDF emas!");
    }

    return URL.createObjectURL(blob); // 🔹 object URL qaytadi
  }
}

const fileService = new FileService();

export default fileService;
