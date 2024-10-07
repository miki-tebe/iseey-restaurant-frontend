import { getUsers } from "@/app/actions";
import UserTable from "@/components/user-table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default async function Users() {
  const data = await getUsers();
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <Card>
        <CardHeader className="px-7">
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          <UserTable users={data} />
        </CardContent>
      </Card>
    </main>
  );
}
