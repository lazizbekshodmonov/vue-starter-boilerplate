import type { TGuaranteeStatus } from "@/types/ui/guarantees.ts";

export const GUARANTEE_STATUSES: TGuaranteeStatus[] = [
  "CREATED_BY_CLIENT_MANAGER",
  "SENT_TO_MAIN_BANK",
  "RESUBMITTED_TO_MAIN_BANK",
  "WAITING_FOR_BRANCH_SIGNATURE",
  "RETURNED_FOR_REVISION",
  "SIGNED_BY_BRANCH",
  "PRINTED_AND_COMPLETED",
];
