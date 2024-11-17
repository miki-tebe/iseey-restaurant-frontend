import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function TableStandSkeleton() {
  return (
    <Card className="bg-zinc-800 border-zinc-700 max-w-sm mx-auto">
      <CardHeader>
        <Skeleton className="h-12 w-24 bg-zinc-700 mb-4" />
        <Skeleton className="h-6 w-28 bg-zinc-700 mb-2" />
        <Skeleton className="h-4 w-20 bg-zinc-700 mb-2" />
        <Skeleton className="h-8 w-24 bg-zinc-700" />
      </CardHeader>
      <CardFooter>
        <div className="flex items-center justify-between w-full">
          <Skeleton className="h-10 w-10 bg-zinc-700" />
          <Skeleton className="h-6 w-6 bg-zinc-700" />
          <Skeleton className="h-10 w-10 bg-zinc-700" />
        </div>
      </CardFooter>
    </Card>
  );
}
