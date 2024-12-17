import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function PricingSkeleton() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Pricing Section */}
        <Skeleton className="h-10 w-40 mx-auto mb-12" />

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
          {/* Monthly Plan Skeleton */}
          <Card className="border-zinc-700">
            <CardHeader>
              <Skeleton className="h-12 w-24 bg-zinc-700 mb-4" />
              <Skeleton className="h-6 w-20 bg-zinc-700 mb-2" />
              <Skeleton className="h-4 w-16 bg-zinc-700 mb-4" />
              <Skeleton className="h-8 w-32 bg-zinc-700" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full bg-zinc-700" />
              <Skeleton className="h-4 w-full bg-zinc-700" />
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Skeleton className="h-4 w-40 bg-zinc-700" />
              <Skeleton className="h-10 w-full bg-zinc-700" />
            </CardFooter>
          </Card>

          {/* Annual Plan Skeleton */}
          <Card className="border-zinc-700">
            <CardHeader>
              <Skeleton className="h-12 w-24 bg-zinc-700 mb-4" />
              <Skeleton className="h-6 w-20 bg-zinc-700 mb-2" />
              <Skeleton className="h-4 w-16 bg-zinc-700 mb-4" />
              <Skeleton className="h-8 w-32 bg-zinc-700" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full bg-zinc-700" />
              <Skeleton className="h-4 w-full bg-zinc-700" />
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Skeleton className="h-4 w-40 bg-zinc-700" />
              <Skeleton className="h-10 w-full bg-zinc-700" />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
