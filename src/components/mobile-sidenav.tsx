"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, Menu, ForkKnife, User, Users, LogOut } from "lucide-react";

import { logout } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function MobileSideBar() {
  const pathname = usePathname();

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
            className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
              pathname === "/dashboard" ? "text-primary" : ""
            }`}
          >
            <Home className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="/dashboard/offers"
            className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
              pathname.startsWith("/dashboard/offers") ? "text-primary" : ""
            }`}
          >
            <ForkKnife className="h-5 w-5" />
            Angebote
          </Link>
          <Link
            href="/dashboard/guests"
            className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
              pathname.startsWith("/dashboard/guests") ? "text-primary" : ""
            }`}
          >
            <Users className="h-5 w-5" />
            Gäste
          </Link>
          <Link
            href="/dashboard/profile"
            className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
              pathname === "/dashboard/profile" ? "text-primary" : ""
            }`}
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
