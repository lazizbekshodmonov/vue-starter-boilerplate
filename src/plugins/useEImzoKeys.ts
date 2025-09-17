// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import useKeys from "@/plugins/e-imzo/web/useKey.js";
import { type Ref } from "vue";

export interface Certificate {
  disk: string; // Sertifikat fayli joylashgan disk
  path: string; // Sertifikat papkasi
  name: string; // Sertifikat fayl nomi
  alias: string; // To'liq' DN (Distinguished Name)
  serialNumber: string; // Sertifikat seriya raqami
  validFrom: string; // Boshlanish sanasi (ISO formatda)
  validTo: string; // Tugash sanasi (ISO formatda)
  CN: string; // Common Name (F.I.O)
  TIN: string; // STIR / INN
  UID: string; // UID
  PINFL: string; // PINFL
  O: string; // Organization
  T: string; // Title (lavozim)
  type: string; // Sertifikat turi (masalan: pfx)
  expired: boolean; // Muddati o‘tgan yoki yo‘qligi
}

type CreatePkcs7Payload = {
  UUID: unknown;
} & Certificate;
type getItem = (payload: CreatePkcs7Payload) => void;
type onConfirm = (item: Certificate, challenge: string) => void;

export type TUseKeys = [
  Ref<Certificate[]>,
  Ref<string | null>,
  Ref<string | null>,
  getItem,
  onConfirm,
];

export default function useEImzoKeys(): TUseKeys {
  return useKeys();
}
