import type { Certificate } from "@/plugins/useEImzoKeys.ts";
import type { TUserRole } from "@/types/ui/employees.ts";

export interface ILoginEriForm {
  key: Certificate | null;
  serviceType: "documents" | "guaranty" | null;
}

export interface IAdminLoginForm {
  username: string;
  password: string;
}

export interface IAuthResponse {
  token: string;
  tokenType: string;
  fullName: string;
  role: TUserRole;
  pinfl: string;
  branchCode: string;
  expiresAt: number;
}

export interface IChallengeResponse {
  challenge: string;
  ttl: number;
  status: number;
  message: string;
}
