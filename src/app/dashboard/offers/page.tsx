import { getOffers } from "@/app/actions";
import OfferTable from "@/components/offer-table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default async function Offers() {
  const data = await getOffers();
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <Card>
        <CardHeader className="px-7">
          <CardTitle>Angebotsliste</CardTitle>
        </CardHeader>
        <CardContent>
          <OfferTable offers={data} />
        </CardContent>
      </Card>
    </main>
  );
}
