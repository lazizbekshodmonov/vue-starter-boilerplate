export type TUserRole =
  | "UPR_BRANCH"
  | "ADMIN_GUAR"
  | "REP_KAD"
  | "CLIENT_MANAGER";

export interface IEmployee {
  id: number;
  pinfl: string;
  role: TUserRole;
  branchCode: string;
  fullName: string;
  active: boolean;
  createdAt: string;
}

export interface IEmployeeForm {
  pinfl: string;
  fullName: string;
  branchCode: string;
  role: TUserRole | null;
  active: boolean;
}
