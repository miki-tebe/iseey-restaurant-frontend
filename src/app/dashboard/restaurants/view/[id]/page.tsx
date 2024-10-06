import { getRestaurant } from "@/app/actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function ViewRestaurant({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const restaurant = await getRestaurant({ id });

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Restaurant</h1>
      </div>
      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
        <Card>
          <CardContent className="flex flex-col items-center space-y-4 pt-5">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={restaurant?.image} alt="Profile picture" />
                <AvatarFallback>{restaurant?.name}</AvatarFallback>
              </Avatar>
            </div>
            <h2 className="text-2xl font-bold">{restaurant?.name}</h2>
          </CardContent>
        </Card>
        <div className="grid gap-4 col-span-2">
          <Card>
            <CardContent className="space-y-5 pt-5">
              <div className="grid gap-1.5">
                <Label>Restaurant Name</Label>
                <Input disabled value={restaurant?.name} />
              </div>
              <div className="grid gap-1.5">
                <Label>Address</Label>
                <Input disabled value={restaurant?.address} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-1.5">
                  <Label>Email</Label>
                  <Input disabled value={restaurant?.email} />
                </div>
                <div className="grid gap-1.5">
                  <Label>Phone Number</Label>
                  <Input disabled value={restaurant?.phoneNumber.original} />
                </div>
              </div>
              <div className="grid gap-1.5">
                <Label>Number of Tables</Label>
                <Input disabled value={restaurant?.number_of_tables} />
              </div>
              <div className="grid gap-1.5">
                <Label>Facebook</Label>
                <Input disabled value={restaurant?.facebook} />
              </div>
              <div className="grid gap-1.5">
                <Label>Instagram</Label>
                <Input disabled value={restaurant?.instagram} />
              </div>
              <div className="grid gap-1.5">
                <Label>Website</Label>
                <Input disabled value={restaurant?.website} />
              </div>
              <div className="grid gap-1.5">
                <Label>Menu</Label>
                <Input disabled value={restaurant?.menu} />
              </div>
              <div className="grid gap-1.5">
                <Label>Drink menu</Label>
                <Input disabled value={restaurant?.drink_menu} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
