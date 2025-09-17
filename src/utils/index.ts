import { storage } from "@/utils/storage.ts";

export function logOut() {
  storage.clearTokens();
  window.location.href = "/";
  return null;
}
