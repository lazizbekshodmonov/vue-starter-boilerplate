import externalClient from "@/shared/api/externalClient.ts";
import { storage } from "@/utils/storage.ts";

const { getToken } = storage;

export async function printPdf(url: string) {
  const token = getToken();
  const response = await externalClient<BlobPart>({
    url,
    responseType: "arraybuffer",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const blob = new Blob([response.data], { type: "application/pdf" });
  const blobUrl = URL.createObjectURL(blob);

  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.src = blobUrl;
  iframe.onload = () => {
    iframe.contentWindow?.print();
  };
  document.body.appendChild(iframe);
}
