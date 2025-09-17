export type TGuaranteeStatus =
  | "CREATED_BY_CLIENT_MANAGER"
  | "SENT_TO_MAIN_BANK"
  | "RESUBMITTED_TO_MAIN_BANK"
  | "WAITING_FOR_BRANCH_SIGNATURE"
  | "RETURNED_FOR_REVISION"
  | "SIGNED_BY_BRANCH"
  | "PRINTED_AND_COMPLETED"
  | "CANCELLED_BY_UPR_BRANCH";

export type TOnlyOfficeMode = "edit" | "view";

export interface IGuarantee {
  id: number;
  clientName: string;
  clientUniqueCode: string;
  productCode: string;
  amount: number;
  currency: string;
  status: TGuaranteeStatus;
  branchCode: string;
  createdAt: string; // ISO datetime
  sentToMainBankAt: string | null; // ISO datetime or null
  signedByBranchAt: string | null;
  printedAt: string | null;
  createdByPinfl: string;
  docxUrl: string;
  pdfUrl: string | null;
  qrLink: string | null;
  revisionComment: string | null;
}

export interface IGuarantyForm {
  clientUniqueCode: string;
  contractNumber: string;
}

export interface IGuaranteeVars {
  open_date: string;
  close_date: string;
  branch_name: string;
  branch_address: string;
  branch_id: string;
  validity_day: string;
  validity: string;
  product_id: string;
  created_by: string;
  client_name: string;
  amount: string;
  purpose_gaurant: string;
  object_gaurant: string;
  contract_id: string;
  client_inn: string;
  client_code: string;
  contract_number: string;
  today: string;
}

export interface IGuaranteeResponse {
  vars: IGuaranteeVars;
  readOnlyKeys: Array<keyof IGuaranteeVars>;
}

export interface IGuaranteeListItem {
  id: number;
  clientName: string;
  productCode: string;
  amount: string; // string, чтобы избежать проблем с форматами/локалью
  createdAt: string; // ISO-8601 строка
  status: TGuaranteeStatus; // текущий статус
  docxUrl: string; // ссылка на предпросмотр DOCX
}

export interface ClientManagerModalAction {
  data: IGuarantee | null;
  openSendToBankModal: boolean;
  openResendToBankModal: boolean;
  refreshData?: (value: string | number) => Promise<void>;
}
