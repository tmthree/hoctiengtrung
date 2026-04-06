// Profile page loading skeleton
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileLoading() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Skeleton className="h-7 w-32" />

      {/* Profile form skeleton */}
      <Skeleton className="h-44 rounded-xl" />

      {/* Daily goal skeleton */}
      <Skeleton className="h-36 rounded-xl" />

      {/* Stats skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-36" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
      </div>

      {/* Achievements skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
