export type UserRoleType =
  | "CLIENT_MANAGER"
  | "ADMIN_GUAR"
  | "REP_KAD"
  | "UPR_BRANCH";

export interface IUserProfile {
  pinfl: string;
  role: UserRoleType;
  branchCode: string;
  fullName: string;
  photoUrl: string | null;
}
