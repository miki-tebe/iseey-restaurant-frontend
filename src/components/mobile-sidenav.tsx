import Link from "next/link";
import Image from "next/image";
import { Home, Menu, ForkKnife, User, Users, LogOut, Gem } from "lucide-react";

import { logout } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getAssetPath } from "@/lib/utils";

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
              src={getAssetPath("/images/logo4.png")}
              alt="ISSEY Logo"
              width={180}
              height={180}
            />
          </Link>
          <Link
            href="/dashboard"
            className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground`}
          >
            <Home className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="/dashboard/offers"
            className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground`}
          >
            <ForkKnife className="h-5 w-5" />
            Angebote
          </Link>
          <Link
            href="/dashboard/pricing"
            className={`flex items-center gap-4 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground`}
          >
            <Gem className="h-6 w-6" />
            Preise
          </Link>
          <Link
            href="/dashboard/guests"
            className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground`}
          >
            <Users className="h-5 w-5" />
            Gäste
          </Link>
          <Link
            href="/dashboard/newsletter"
            className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground`}
          >
            <User className="h-5 w-5" />
            NewsLetter
          </Link>
          <Link
            href="/dashboard/profile"
            className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground`}
          >
            <User className="h-5 w-5" />
            Mein Profil
          </Link>
          <form
            action={logout}
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-5 w-5" />
            <button type="submit">Logout</button>
          </form>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
