import dayjs from "dayjs";

export function isExpired(validTo: string | Date): boolean {
  return dayjs().isAfter(dayjs(validTo));
}

export function formatDateNumeric(date: string): string {
  return dayjs(date).format("DD.MM.YYYY");
}
