"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, ForkKnife, User, Users, LogOut, Gem } from "lucide-react";

import { logout } from "@/app/actions";
import { cn, getAssetPath } from "@/lib/utils";

const routes = [
  {
    href: "/dashboard/index",
    label: "Dashboard",
    icon: <Home className="h-6 w-6" />,
  },
  {
    href: "/dashboard/offers",
    label: "Offers",
    icon: <ForkKnife className="h-6 w-6" />,
  },
  {
    href: "/dashboard/pricing",
    label: "Pricing",
    icon: <Gem className="h-6 w-6" />,
  },
  {
    href: "/dashboard/guests",
    label: "Guests",
    icon: <Users className="h-6 w-6" />,
  },
  {
    href: "/dashboard/newsletter",
    label: "NewsLetter",
    icon: <User className="h-6 w-6" />,
  },
  {
    href: "/dashboard/profile",
    label: "My Profile",
    icon: <User className="h-6 w-6" />,
  },
];

export default function DesktopSideBar() {
  const pathname = usePathname();
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-5">
        <div className="flex h-14 items-center border-b px-4 lg:h-[100px] lg:px-6">
          <Link
            href="/dashboard/index"
            className="flex items-center gap-2 font-semibold lg:px-5"
          >
            <Image
              src={getAssetPath("/images/logo4.png")}
              alt="ISSEY Logo"
              width={180}
              height={180}
              // className="py-4"
            />
          </Link>
        </div>
        <div className="flex-1 lg:px-6">
          <nav className="grid items-start px-2 text-lg font-medium lg:px-4 gap-5">
            {routes.map((route) => (
              <Link
                href={route.href}
                className={cn(
                  `flex items-center gap-4 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground`,
                  pathname === route.href && "text-foreground"
                )}
                key={route.href}
              >
                {route.icon}
                {route.label}
              </Link>
            ))}
            <form
              action={logout}
              className="flex items-center gap-4 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
            >
              <LogOut className="h-6 w-6" />
              <button type="submit">Logout</button>
            </form>
          </nav>
        </div>
      </div>
    </div>
  );
}
