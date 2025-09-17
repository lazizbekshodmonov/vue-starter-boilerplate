export function formatNumberWithSpaces(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function formatAmount(value: number | string): string {
  const num = Number(value);

  if (Number.isNaN(num)) return String(value);

  if (Number.isInteger(num)) {
    return num.toLocaleString("ru-RU");
  }

  const parts = num.toString().split(".");
  const whole = Number(parts[0]).toLocaleString("ru-RU");
  return `${whole}.${parts[1]}`;
}
