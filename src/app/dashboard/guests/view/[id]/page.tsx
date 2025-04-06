import { getGuest } from "@/app/actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Breadcrumbs } from "@/components/bread-crumbs";

export default async function ViewUser({ params }: { params: { id: string } }) {
  const { id } = params;
  const user = await getGuest({ id });

  return (
    <main className="flex flex-1 flex-col overflow-y-scroll gap-4 p-4 lg:gap-6 lg:p-6">
      <Breadcrumbs />
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Guest Information</h1>
      </div>
      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
        <Card>
          <CardContent className="flex flex-col items-center space-y-4 pt-5">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={user?.image} alt="Profile picture" />
                <AvatarFallback>
                  {user?.first_name?.charAt(0)}
                  {user?.last_name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
            <h2 className="text-2xl font-bold">
              {user?.first_name} {user?.last_name}
            </h2>
          </CardContent>
        </Card>
        <div className="grid gap-4 col-span-2">
          <Card>
            <CardContent className="space-y-5 pt-5">
              <div className="grid gap-1.5">
                <Label>Vorname</Label>
                <Input disabled value={user?.first_name} />
              </div>
              <div className="grid gap-1.5">
                <Label>Familienname, Nachname</Label>
                <Input disabled value={user?.last_name} />
              </div>
              <div className="grid gap-1.5">
                <Label>Land</Label>
                <Input disabled value={user?.country_name} />
              </div>
              <div className="grid gap-1.5">
                <Label>Date of Birth</Label>
                <Input
                  disabled
                  value={new Date(parseFloat(user?.dob)).toLocaleDateString()}
                />
              </div>
              <div className="grid gap-1.5">
                <Label>Bio</Label>
                <Textarea disabled value={user?.bio} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
