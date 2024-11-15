"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, ForkKnife, User, Users, LogOut } from "lucide-react";

import { logout } from "@/app/actions";

export default function DesktopSideBar() {
  const pathname = usePathname();

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
              className={`flex items-center gap-4 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground ${
                pathname === "/dashboard" ? "text-primary" : ""
              }`}
            >
              <Home className="h-6 w-6" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/offers"
              className={`flex items-center gap-4 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground ${
                pathname.startsWith("/dashboard/offers") ? "text-primary" : ""
              }`}
            >
              <ForkKnife className="h-6 w-6" />
              Angebote
            </Link>
            <Link
              href="/dashboard/guests"
              className={`flex items-center gap-4 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground ${
                pathname.startsWith("/dashboard/guests") ? "text-primary" : ""
              }`}
            >
              <Users className="h-6 w-6" />
              Gäste
            </Link>
            <Link
              href="/dashboard/newsletter"
              className={`flex items-center gap-4 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground ${
                pathname === "/dashboard/newsletter" ? "text-primary" : ""
              }`}
            >
              <User className="h-6 w-6" />
              NewsLetter
            </Link>
            <Link
              href="/dashboard/profile"
              className={`flex items-center gap-4 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground ${
                pathname === "/dashboard/profile" ? "text-primary" : ""
              }`}
            >
              <User className="h-6 w-6" />
              Mein Profil
            </Link>
            <a
              onClick={() => logout()}
              className="flex items-center gap-4 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
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
