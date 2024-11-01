"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { MoreHorizontal, Eye } from "lucide-react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getFilteredRowModel,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import { User } from "@/components/user-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export type Guest = {
  _id: string;
  restaurant_id: string;
  user_id: string;
  created: number;
  updated: number;
  userDetail: User;
  lastCheckOut: {
    table_number: number;
  };
};

export const columns: ColumnDef<Guest>[] = [
  {
    header: "Nr",
    accessorKey: "_id",
    cell: ({ row }) => {
      return <span>{row.index + 1}</span>;
    },
  },
  {
    header: "Bild",
    accessorKey: "image",
    cell: ({ row }) => {
      const guest = row.original as Guest;
      return (
        <Image
          src={guest.userDetail.image}
          alt={guest.userDetail.first_name || "Guest"}
          className="h-8 w-8 rounded-full"
          width={32}
          height={32}
        />
      );
    },
  },
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => {
      const guest = row.original as Guest;
      return (
        <>
          {guest.userDetail.first_name} {guest.userDetail.last_name}
        </>
      );
    },
  },
  {
    header: "Datum",
    accessorKey: "created",
    cell: ({ row }) => {
      const guest = row.original as Guest;
      const date = new Date(guest.created);
      return <>{date.toLocaleDateString()}</>;
    },
  },
  {
    header: "Tisch Nummer",
    accessorKey: "code",
    cell: ({ row }) => {
      const guest = row.original as Guest;
      return <>{guest.lastCheckOut?.table_number}</>;
    },
  },
  {
    header: "Land",
    accessorKey: "code",
    cell: ({ row }) => {
      const guest = row.original as Guest;
      return <>{guest.userDetail.country_name}</>;
    },
  },
  {
    header: "Alter",
    accessorKey: "code",
    cell: ({ row }) => {
      const guest = row.original as Guest;
      const dob = new Date(parseFloat(guest.userDetail.dob));
      const age = new Date().getFullYear() - dob.getFullYear();
      return <>{age}</>;
    },
  },
  {
    id: "Aktionen",
    header: "Actions",
    cell: ({ row }) => {
      const guest = row.original as Guest;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <Link href={`/dashboard/guests/view/${guest.user_id}`}>
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                View guest
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function GuestTable({ guests }: { guests: Guest[] }) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: guests,
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
    <div className="grid gap-y-5">
      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
        <Input
          placeholder="Search"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
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
  );
}
