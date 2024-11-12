import { format } from "date-fns";
import { ForkKnife, Users, FileBarChartIcon } from "lucide-react";

import { getDashboard, verifySession } from "@/lib/dal";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import ActiveGuests from "@/components/active-guests"; // Import the new component

type Customer = {
  userDetail: {
    first_name?: string;
    last_name?: string;
    country_name?: string;
    dob: string;
  };
  created: string;
};

export default async function Dashboard() {
  const data = await getDashboard();
  const session = await verifySession();
  const token: string = session.token as string;

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>
      <ActiveGuests sessionToken={token} />
      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg">Gäste</CardTitle>
            <Users className="h-10 w-10 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.customersCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg">Tische</CardTitle>
            <ForkKnife className="h-10 w-10 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.number_of_tables}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg">Angebote</CardTitle>
            <FileBarChartIcon className="h-10 w-10 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.offerCount}</div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="px-7">
          <CardTitle>Gäste</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden sm:table-cell">Nr</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Datum</TableHead>
                <TableHead className="hidden md:table-cell">Land</TableHead>
                <TableHead className="hidden md:table-cell">Alter</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data && data.customers.length > 0 ? (
                data.customers.map((customer: Customer, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="hidden sm:table-cell">
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      {customer?.userDetail?.first_name}{" "}
                      {customer?.userDetail?.last_name}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {customer?.created
                        ? format(new Date(customer?.created), "PPP")
                        : "N/A"}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {customer?.userDetail?.country_name}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date().getFullYear() -
                        new Date(
                          parseFloat(customer?.userDetail?.dob)
                        ).getFullYear()}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
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
