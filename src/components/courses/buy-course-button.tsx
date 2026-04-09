"use client";
// Buy button — calls createCheckoutSession and redirects to Stripe Checkout
import { useState } from "react";
import { createCheckoutSession } from "@/lib/actions/payment-actions";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingCart, CheckCircle } from "lucide-react";
import { formatVND } from "@/lib/format-currency";

interface BuyCourseButtonProps {
  courseId: string;
  price: number;
  currency: string;
  enrolled: boolean;
}

export function BuyCourseButton({ courseId, price, enrolled }: BuyCourseButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleBuy() {
    setLoading(true);
    setError(null);
    try {
      const result = await createCheckoutSession(courseId);
      if (result.success && result.url) {
        window.location.href = result.url;
      } else {
        setError(result.error ?? "Lỗi không xác định");
        setLoading(false);
      }
    } catch {
      setError("Không thể kết nối. Vui lòng thử lại.");
      setLoading(false);
    }
  }

  if (enrolled) {
    return (
      <div className="flex items-center gap-2 text-green-600 font-medium">
        <CheckCircle className="h-5 w-5" />
        <span>Đã đăng ký khóa học</span>
      </div>
    );
  }

  const priceLabel = price === 0 ? "Miễn phí" : formatVND(price);

  return (
    <div className="space-y-2">
      <Button
        onClick={handleBuy}
        disabled={loading}
        className="w-full"
        size="lg"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Đang xử lý...
          </>
        ) : (
          <>
            <ShoppingCart className="h-4 w-4 mr-2" />
            {price === 0 ? "Đăng ký miễn phí" : `Mua ngay — ${priceLabel}`}
          </>
        )}
      </Button>
      {error && (
        <p className="text-sm text-destructive text-center">{error}</p>
      )}
    </div>
  );
}
