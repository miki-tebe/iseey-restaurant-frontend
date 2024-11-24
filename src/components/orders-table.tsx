"use client";

import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getFilteredRowModel,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

// import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export type Order = {
  _id: string;
  restaurant_id: string;
  product_id: string;
  created: number;
  updated: number;
  total_price: number;
  quantity: number;
};

export const columns: ColumnDef<Order>[] = [
  {
    header: "Nr",
    accessorKey: "_id",
    // cell: ({ row }) => {
    //   return <span>{row.index + 1}</span>;
    // },
  },
  {
    header: "Crowd",
    accessorKey: "quantity",
    // cell: ({ row }) => {
    //   const guest = row.original as Guest;
    //   return (
    //     <Image
    //       src={guest.userDetail.image}
    //       alt={guest.userDetail.first_name || "Guest"}
    //       className="h-8 w-8 rounded-full"
    //       width={32}
    //       height={32}
    //     />
    //   );
    // },
  },
  {
    header: "Total Price",
    accessorKey: "total_price",
    // cell: ({ row }) => {
    //   const guest = row.original as Guest;
    //   return (
    //     <>
    //       {guest.userDetail.first_name} {guest.userDetail.last_name}
    //     </>
    //   );
    // },
  },
  {
    header: "Product",
    accessorKey: "title",
    // cell: ({ row }) => {
    //   const guest = row.original as Guest;
    //   return <>{guest.lastCheckOut?.table_number}</>;
    // },
  },
  {
    header: "Status",
    accessorKey: "status",
    // cell: ({ row }) => {
    //   const guest = row.original as Guest;
    //   return <>{guest.lastCheckOut?.table_number}</>;
    // },
  },
];

export default function OrdersTable({ orders }: { orders: Order[] }) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: orders,
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
      {/* <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
        <Input
          placeholder="Search"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div> */}
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
