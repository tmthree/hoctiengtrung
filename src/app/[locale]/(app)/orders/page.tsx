// Order history page — shows all purchases for the authenticated user
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { getUserOrders } from "@/lib/actions/payment-actions";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface OrdersPageProps {
  params: Promise<{ locale: string }>;
}

// Status label + color mapping
const STATUS_MAP: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  PAID: { label: "Thành công", variant: "default" },
  PENDING: { label: "Đang xử lý", variant: "secondary" },
  FAILED: { label: "Thất bại", variant: "destructive" },
  REFUNDED: { label: "Đã hoàn tiền", variant: "outline" },
  CANCELLED: { label: "Đã hủy", variant: "outline" },
};

function formatVND(amount: number): string {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(date));
}

export default async function OrdersPage({ params }: OrdersPageProps) {
  const { locale } = await params;
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect({ href: "/login", locale });
    return null;
  }

  const result = await getUserOrders();
  const orders = result.success ? result.data ?? [] : [];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Lịch sử đơn hàng</h1>
        <p className="text-muted-foreground">Danh sách các khóa học bạn đã mua</p>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            Bạn chưa có đơn hàng nào
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => {
            const status = STATUS_MAP[order.status] ?? { label: order.status, variant: "outline" as const };
            return (
              <Card key={order.id}>
                <CardContent className="flex items-center gap-4 py-4">
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-md bg-muted flex-shrink-0 overflow-hidden">
                    {order.course?.thumbnail ? (
                      <Image
                        src={order.course.thumbnail}
                        alt={order.course.title}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                        Ảnh
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{order.course?.title ?? "Khóa học"}</p>
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <span>{formatVND(order.amount)}</span>
                      <span>·</span>
                      <Badge variant={status.variant}>{status.label}</Badge>
                      <span>·</span>
                      <span>{formatDate(order.createdAt)}</span>
                    </div>
                  </div>

                  {/* Link to course */}
                  {order.course && (
                    <Link
                      href={`/courses/${order.course.slug}`}
                      className="text-sm font-medium text-primary hover:underline flex-shrink-0"
                    >
                      Xem khóa học →
                    </Link>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
