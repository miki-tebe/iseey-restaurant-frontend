import { Suspense } from "react";

import { getNewsletters } from "@/app/actions";
import TableSkeleton from "@/components/table-skeleton";
import NewsletterTable from "@/components/newsletter-table";

export default async function NewsLetter() {
  const data = await getNewsletters();
  return (
    <main className="flex flex-1 flex-col overflow-y-scroll gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">NewsLetter</h1>
      </div>
      <div className="grid gap-4 col-span-2"></div>
      <Suspense fallback={<TableSkeleton />}>
        <NewsletterTable newsletters={data ?? []} />
      </Suspense>
    </main>
  );
}
