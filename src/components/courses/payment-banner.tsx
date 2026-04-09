"use client";
// Payment result banner — shown after Stripe redirect with ?payment=success|cancelled
import { useEffect, useState } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

interface PaymentBannerProps {
  status: string;
}

export function PaymentBanner({ status }: PaymentBannerProps) {
  const [visible, setVisible] = useState(true);

  // Auto-dismiss after 6s
  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  const isSuccess = status === "success";
  const isCancelled = status === "cancelled";
  if (!isSuccess && !isCancelled) return null;

  return (
    <div
      className={`flex items-center gap-3 rounded-lg border px-4 py-3 ${
        isSuccess
          ? "bg-green-50 border-green-200 text-green-800"
          : "bg-yellow-50 border-yellow-200 text-yellow-800"
      }`}
    >
      {isSuccess ? (
        <CheckCircle className="h-5 w-5 shrink-0 text-green-600" />
      ) : (
        <XCircle className="h-5 w-5 shrink-0 text-yellow-600" />
      )}
      <p className="flex-1 text-sm font-medium">
        {isSuccess
          ? "Thanh toán thành công! Bạn đã đăng ký khóa học."
          : "Thanh toán đã bị hủy. Bạn có thể thử lại bất cứ lúc nào."}
      </p>
      <button
        onClick={() => setVisible(false)}
        className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
        aria-label="Đóng thông báo"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
