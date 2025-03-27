// import Image from "next/image";

// import { getUser } from "@/lib/dal";
// import { Button } from "@/components/ui/button";
import MobileSideBar from "@/components/mobile-sidenav";
import DesktopSideBar from "@/components/desktop-sidenav";
import { Suspense } from "react";
import UserProfile from "@/components/user-profile";
import { UserProfileSkeleton } from "@/components/user-profile-skeleton";

async function Header() {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[100px] lg:px-6">
      <MobileSideBar />
      <div className="ml-auto flex items-center gap-2"></div>
      <Suspense fallback={<UserProfileSkeleton />}>
        <UserProfile />
      </Suspense>
      {/* <Button variant="secondary" size="icon" className="rounded-full">
        <Image
          src={user?.image}
          alt="User Avatar"
          width={32}
          height={32}
          className="rounded-full"
        />
      </Button>
      <div>
        <div className="text-sm font-medium">{user?.name}</div>
        <div className="text-xs text-muted-foreground">
          Restaurant administrator
        </div>
      </div> */}
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
