import type { IGuarantee, TGuaranteeStatus } from "@/types/ui/guarantees.ts";

export interface RepKadGuarantee {
  id: number;
  clientName: string;
  clientUniqueCode: string;
  productCode: string;
  amount: number;
  currency: string;
  status: TGuaranteeStatus;
  branchCode: string;
  createdAt: string; // ISO datetime string
  sentToMainBankAt: string | null;
  signedByBranchAt: string | null;
  printedAt: string | null;
  createdByPinfl: string;
  docxUrl: string;
  pdfUrl: string | null;
  qrLink: string;
}

export interface RepKadModalAction {
  data: IGuarantee | null;
  openReturnModal?: boolean;
  openApproveModal?: boolean;
  openSignatureModal?: boolean;
  openCancelModal?: boolean;
}
