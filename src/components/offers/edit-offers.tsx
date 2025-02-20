import { getOffer } from "@/app/actions";
import { Offer } from "@/types/type";
import { CardContent } from "@/components/ui/card";
import EditOfferForm from "@/components/offers/edit-offer-form";

export default async function EditOffer({
  params,
}: {
  params: { id: string };
}) {
  const offer: Offer = await getOffer({ id: params.id });
  if (!offer) {
    return (
      <CardContent>
        <p className="text-center text-zinc-400">No offer found.</p>
      </CardContent>
    );
  }
  return <EditOfferForm offer={offer} />;
}
