import React from "react";
import Image from "next/image";
import { getUser } from "@/lib/dal";
import { Button } from "@/components/ui/button";

export default async function UserProfile() {
  const user = await getUser();
  return (
    <>
      <Button variant="secondary" size="icon" className="rounded-full">
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
      </div>
    </>
  );
}
