// VND currency formatter — price is stored in VND (no cents, 1 VND = 1 unit)
export function formatVND(amountInDong: number): string {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amountInDong);
}
