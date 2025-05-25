"use client";

import { useState } from "react";
import { format } from "date-fns";
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
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { User } from "./user-table";
import { EmailModal } from "./send-newsletter";

export type Newsletter = {
  _id: string;
  userDetail: User;
};

export const columns: ColumnDef<Newsletter>[] = [
  {
    header: "Nr",
    accessorKey: "id",
    cell: ({ row }) => {
      return <>{row.index + 1}</>;
    },
  },
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => {
      const data = row.original as Newsletter;
      return (
        <>
          {data.userDetail.first_name} {data.userDetail.last_name}
        </>
      );
    },
  },
  {
    header: "Email",
    accessorKey: "email",
    cell: ({ row }) => {
      const data = row.original as Newsletter;
      return <>{data.userDetail.email}</>;
    },
  },
  {
    header: "Datum",
    accessorKey: "date",
    cell: ({ row }) => {
      const data = row.original as Newsletter;
      if (data.userDetail.dob) {
        const age =
          new Date().getFullYear() -
          new Date(parseFloat(data.userDetail.dob)).getFullYear();
        return <>{age}</>;
      }
    },
  },
  {
    header: "Land",
    accessorKey: "country",
    cell: ({ row }) => {
      const data = row.original as Newsletter;
      return <>{data.userDetail.country_name}</>;
    },
  },
  {
    header: "Alter",
    accessorKey: "age",
    cell: ({ row }) => {
      const data = row.original as Newsletter;
      if (data.userDetail.dob) {
        const age =
          new Date().getFullYear() -
          new Date(parseFloat(data.userDetail.dob)).getFullYear();
        return <>{age}</>;
      }
    },
  },
];

export default function NewsletterTable({
  newsletters,
  token,
}: {
  newsletters: Newsletter[];
  token: {};
}) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const table = useReactTable({
    data: newsletters,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      columnFilters,
    },
  });

  const download = () => {
    const getCSV = `https://iseey.app/restaurants/api/newsletters/download?authorization=${token}`;
    window.open(getCSV, "__blank", "noopener,noreferrer");
  };

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
        <div className="justify-self-end space-x-2">
          <Button onClick={download}>Daten exportieren</Button>
          <Button onClick={() => setIsModalOpen(true)}>
            Newsletter senden
          </Button>
        </div>
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
      <EmailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        restaurantName="Restaurant Name"
      />
    </div>
  );
}
