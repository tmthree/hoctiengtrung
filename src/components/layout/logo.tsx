import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2 font-bold text-xl", className)}
    >
      <span className="text-2xl">中</span>
      <span className="text-primary">Học Tiếng Trung</span>
    </Link>
  );
}
