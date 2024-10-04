"use client";

import Link from "next/link";
import Image from "next/image";
import { Home, Menu, ForkKnife, User, Users, LogOut } from "lucide-react";

import { logout } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function MobileSideBar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-semibold lg:px-5"
          >
            <Image
              src="/images/logo4.png"
              alt="ISSEY Logo"
              width={180}
              height={180}
            />
          </Link>
          <Link
            href="/dashboard"
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <Home className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="/dashboard/restaurants"
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <ForkKnife className="h-5 w-5" />
            Restaurants
          </Link>
          <Link
            href="/dashboard/users"
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <Users className="h-5 w-5" />
            Users
          </Link>
          <Link
            href="/dashboard/profile"
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <User className="h-5 w-5" />
            My Profile
          </Link>
          <a
            onClick={() => logout()}
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </a>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
