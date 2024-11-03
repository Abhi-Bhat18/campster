import { Skeleton } from "@/components/ui/skeleton";

export function DataCardSkeleton() {
  return (
    <div className="flex space-x-2 w-full basis-1/4">
      <Skeleton className="h-14 w-14 rounded-md" />
      <div className="space-y-2 w-full">
        <Skeleton className="h-5" />
        <Skeleton className="h-4 w-[50%]" />
      </div>
    </div>
  );
}
