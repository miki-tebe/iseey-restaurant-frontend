"use client";

import Link from "next/link";
import * as React from "react";
import { format } from "date-fns";
import { MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getFilteredRowModel,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Restaurant = {
  _id: string;
  email_verified: string;
  image: string;
  lat: number;
  lng: number;
  address: string;
  active: string;
  deleted: string;
  number_of_tables: number;
  menu_type: string;
  menu: string;
  facebook: string;
  website: string;
  name: string;
  phoneNumber: string;
  email: string;
  updated: number;
  created: number;
  bio: string;
};

const data: Restaurant[] = [
  {
    _id: "1",
    email_verified: "1",
    image: "/images/avatar.jpg",
    lat: 52.52,
    lng: 13.405,
    address: "Berlin",
    active: "1",
    deleted: "0",
    number_of_tables: 10,
    menu_type: "Vegan",
    menu: "Menu",
    facebook: "facebook",
    website: "website",
    name: "Restaurant",
    phoneNumber: "123456789",
    email: "[email protected]",
    updated: 1624416000,
    created: 1689793402676,
    bio: "Description",
  },
];

export const columns: ColumnDef<Restaurant>[] = [
  {
    header: "Nr",
    accessorKey: "_id",
  },
  {
    header: "Restaurant Name",
    accessorKey: "name",
  },
  {
    header: "Total Tables",
    accessorKey: "number_of_tables",
  },
  {
    header: "Address",
    accessorKey: "address",
  },
  {
    header: "Created Date",
    accessorKey: "created",
    cell: ({ row }) =>
      format(new Date(row.getValue("created")).toLocaleDateString(), "PPP"),
  },
  {
    header: "Status",
    accessorKey: "active",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const restaurant = row.original as Restaurant;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <Link href={`/dashboard/restaurants/view/${restaurant._id}`}>
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                View restaurant
              </DropdownMenuItem>
            </Link>
            <Link href={`/dashboard/restaurants/edit/${restaurant._id}`}>
              <DropdownMenuItem>
                <Pencil className="mr-2 h-4 w-4" />
                Edit restaurant
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete restaurant
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function Users() {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      columnFilters,
    },
  });

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Restaurants</h1>
      </div>
      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
        <Input
          placeholder="Search"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Button asChild className="justify-self-end">
          <Link href="/dashboard/restaurants/add">Add Restaurant</Link>
        </Button>
      </div>
      <Card>
        <CardHeader className="px-7">
          <CardTitle>All Restaurants</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <div className="flex items-center justify-end space-x-2 py-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
