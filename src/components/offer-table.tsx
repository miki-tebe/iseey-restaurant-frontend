"use client";

import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { useState } from "react";
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

import { deleteOffer } from "@/app/actions";
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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

export type Offer = {
  _id: string;
  code: string;
  image: string;
  currency?: string;
  deleted: "Y" | "N";
  name: string;
  discount: number;
  start_date: string;
  end_date: string;
  restaurant_id: string;
  description: string;
  offer_type: "percentage" | "fixed";
};

export const columns: ColumnDef<Offer>[] = [
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
      return (
        <Image
          src={row.getValue("image")}
          alt={row.getValue("name")}
          className="h-8 w-8 rounded-full"
          width={32}
          height={32}
        />
      );
    },
  },
  {
    header: "Bietet an",
    accessorKey: "name",
  },
  {
    header: "Rabatt",
    accessorKey: "discount",
  },
  {
    header: "Code",
    accessorKey: "code",
  },
  {
    header: "Startdatum",
    accessorKey: "start_date",
    cell: ({ row }) =>
      format(new Date(row.getValue("start_date")).toLocaleDateString(), "PPP"),
  },
  {
    header: "Endtermin",
    accessorKey: "end_date",
    cell: ({ row }) =>
      format(new Date(row.getValue("end_date")).toLocaleDateString(), "PPP"),
  },
  {
    id: "Aktionen",
    header: "Actions",
    cell: ({ row }) => {
      const offer = row.original as Offer;
      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <Link href={`/dashboard/offers/view/${offer._id}`}>
                <DropdownMenuItem>
                  <Eye className="mr-2 h-4 w-4" />
                  View offer
                </DropdownMenuItem>
              </Link>
              <Link href={`/dashboard/offers/edit/${offer._id}`}>
                <DropdownMenuItem>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit offer
                </DropdownMenuItem>
              </Link>
              <DialogTrigger asChild>
                <DropdownMenuItem className="text-red-500">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete offer
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  onClick={async () => {
                    const result = await deleteOffer({
                      id: offer._id,
                    });
                    toast(result.message);
                  }}
                >
                  Confirm
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
  },
];

export default function OfferTable({ offers }: { offers: Offer[] }) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: offers,
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
        <Button asChild className="justify-self-end">
          <Link href="/dashboard/offers/add">Neue hinzufügen</Link>
        </Button>
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
