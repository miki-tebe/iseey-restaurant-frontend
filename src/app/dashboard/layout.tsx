"use client";

import Link from "next/link";
import Image from "next/image";
import { Home, Menu, ForkKnife, User, Users, LogOut } from "lucide-react";

import { logout } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

function MobileSideBar() {
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

function DesktopSideBar() {
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-5">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
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
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-lg font-medium lg:px-4 gap-5">
            <Link
              href="/dashboard"
              className="flex items-center gap-4 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Home className="h-6 w-6" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/restaurants"
              className="flex items-center gap-4 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <ForkKnife className="h-6 w-6" />
              Restaurants
            </Link>
            <Link
              href="/dashboard/users"
              className="flex items-center gap-4 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Users className="h-6 w-6" />
              Users
            </Link>
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-4 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <User className="h-6 w-6" />
              My Profile
            </Link>
            <a
              onClick={() => logout()}
              className="flex items-center gap-4 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <LogOut className="h-6 w-6" />
              Logout
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <MobileSideBar />
      <div className="ml-auto flex items-center gap-2"></div>
      <Button variant="secondary" size="icon" className="rounded-full">
        <Image
          src="/images/avatar.png"
          alt="User Avatar"
          width={32}
          height={32}
          className="rounded-full"
        />
      </Button>
      <div>
        <div className="text-sm font-medium">John Doe</div>
        <div className="text-xs text-muted-foreground">Super-Admin</div>
      </div>
    </header>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <DesktopSideBar />
      <div className="flex flex-col">
        <Header />
        {children}
      </div>
    </div>
  );
}
