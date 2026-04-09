// Course card — Server Component showing thumbnail, title, instructor, price, enrollment badge
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getHskLevel } from "@/lib/constants/hsk-levels";
import { formatVND } from "@/lib/format-currency";
import { Users, CheckCircle } from "lucide-react";

interface CourseCardProps {
  course: {
    id: string;
    slug: string;
    title: string;
    thumbnail: string | null;
    level: number;
    price: number;
    enrollCount: number;
    instructor: { name: string };
  };
  enrolled?: boolean;
}

export function CourseCard({ course, enrolled = false }: CourseCardProps) {
  const hsk = getHskLevel(course.level);
  const href = `/courses/${course.slug || course.id}`;
  const priceDisplay = course.price === 0 ? "Miễn phí" : formatVND(course.price);

  return (
    <Link href={href} className="group block">
      <Card className="relative h-full transition-shadow group-hover:shadow-md overflow-hidden">
        {/* Thumbnail */}
        <div className="relative h-36 w-full overflow-hidden">
          {course.thumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={course.thumbnail}
              alt={course.title}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div
              className={`h-full w-full ${hsk.bgColor} flex items-center justify-center`}
            >
              <span className={`text-3xl font-bold ${hsk.color} opacity-30`}>
                {hsk.label}
              </span>
            </div>
          )}
          {enrolled && (
            <div className="absolute top-2 right-2 flex items-center gap-1 bg-green-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
              <CheckCircle className="h-3 w-3" />
              Đã đăng ký
            </div>
          )}
        </div>

        <CardHeader className="pb-1 pt-3">
          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className={`${hsk.bgColor} ${hsk.color} border ${hsk.borderColor} text-xs font-semibold`}
            >
              {hsk.label}
            </Badge>
          </div>
          <h3 className="font-semibold text-foreground leading-snug mt-1 line-clamp-2">
            {course.title}
          </h3>
          <p className="text-xs text-muted-foreground">bởi {course.instructor.name}</p>
        </CardHeader>

        <CardContent className="pt-0 pb-3">
          <div className="flex items-center justify-between mt-1">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="h-3.5 w-3.5" />
              {course.enrollCount.toLocaleString("vi-VN")} học viên
            </span>
            <span className={`text-sm font-semibold ${course.price === 0 ? "text-green-600" : "text-foreground"}`}>
              {priceDisplay}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
