"use client";

import Link from "next/link";
import { useState } from "react";
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

export type User = {
  first_name?: string;
  last_name?: string;
  age?: number;
  name: string;
  email: string;
  image: string;
  gender: string;
  dob: string;
  lat: string;
  lng: string;
  address: string;
  postal_code: string;
  description: string;
  active: string;
  deleted: string;
  created: number;
  user_id: string;
  createdAt?: string;
};

export const columns: ColumnDef<User>[] = [
  {
    header: "Nr",
    accessorKey: "user_id",
    cell: ({ row }) => {
      return <>{row.index + 1}</>;
    },
  },
  {
    header: "Name",
    accessorKey: "first_name",
  },
  {
    header: "Gender",
    accessorKey: "gender",
  },
  {
    header: "Age",
    accessorKey: "dob",
    cell: ({ row }) => {
      const user = row.original as User;
      const dob = new Date(parseFloat(user.dob));
      const age = new Date().getFullYear() - dob.getFullYear();
      return <>{age}</>;
    },
  },
  {
    header: "Status",
    accessorKey: "active",
    cell: ({ row }) => {
      const user = row.original as User;
      return <>{user.active === "Y" ? "Active" : "Inactive"}</>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original as User;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <Link href={`/dashboard/users/view/${user.user_id}`}>
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                View user
              </DropdownMenuItem>
            </Link>
            <Link href={`/dashboard/users/edit/${user.user_id}`}>
              <DropdownMenuItem>
                <Pencil className="mr-2 h-4 w-4" />
                Edit user
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete user
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function UserTable({ users }: { users: User[] }) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: users,
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
          value={
            (table.getColumn("first_name")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("first_name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Button asChild className="justify-self-end">
          <Link href="/dashboard/users/add">Add User</Link>
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
