import { getOffer } from "@/app/actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";

export default async function ViewOffer({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const offer = await getOffer({ id });

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Offer Details</h1>
      </div>
      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
        <Card>
          <CardContent className="flex flex-col items-center space-y-4 pt-5">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={offer?.image} alt="Offer Image" />
                <AvatarFallback>{offer?.name}</AvatarFallback>
              </Avatar>
            </div>
            <h2 className="text-2xl font-bold">{offer?.name}</h2>
          </CardContent>
        </Card>
        <div className="grid gap-4 col-span-2">
          <Card>
            <CardContent className="space-y-5 pt-5">
              <div className="grid gap-1.5">
                <Label>Offer Name</Label>
                <Input disabled value={offer?.name} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-1.5">
                  <Label>Start Date</Label>
                  <Input
                    disabled
                    value={new Date(offer?.start_date).toLocaleDateString()}
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label>End Date</Label>
                  <Input
                    disabled
                    value={new Date(offer?.end_date).toLocaleDateString()}
                  />
                </div>
              </div>
              <div className="grid gap-1.5">
                <Label>Code</Label>
                <Input disabled value={offer?.code} />
              </div>
              <div className="grid gap-1.5">
                <Label>Discount</Label>
                <Input disabled value={`${offer?.discount}`} />
              </div>
              <div className="grid gap-1.5">
                <Label>Offer Type</Label>
                <Input disabled value={offer?.offer_type} />
              </div>
              <div className="grid gap-1.5">
                <Label>Description</Label>
                <Textarea disabled value={offer?.description} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
