import { format } from "date-fns";
import { ForkKnife, Users } from "lucide-react";

import { getDashboard } from "@/lib/dal";
import { User } from "@/app/dashboard/users/page";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export default async function Dashboard() {
  const data = await getDashboard();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>
      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg">Users</CardTitle>
            <Users className="h-10 w-10 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.usersCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg">Restaurants</CardTitle>
            <ForkKnife className="h-10 w-10 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.restuantCount}</div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="px-7">
          <CardTitle>Recent Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden sm:table-cell">Nr</TableHead>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead className="hidden md:table-cell">Age</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.users.map((user: User, index: number) => (
                <TableRow key={index}>
                  <TableCell className="hidden sm:table-cell">
                    {index + 1}
                  </TableCell>
                  <TableCell>{user?.first_name}</TableCell>
                  <TableCell>{user?.last_name}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date().getFullYear() -
                      new Date(parseFloat(user?.dob)).getFullYear()}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {user.createdAt
                      ? format(new Date(user.createdAt), "PPP")
                      : "N/A"}
                  </TableCell>
                </TableRow>
              )) || (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
