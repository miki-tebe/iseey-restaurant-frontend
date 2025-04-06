import React from "react";
import { getUser } from "@/lib/dal";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { User } from "lucide-react";

export default async function UserProfile() {
  const user = await getUser();
  return (
    <>
      <Avatar>
        <AvatarImage src={user?.image} alt="User Image" />
        <AvatarFallback>
          <User />
        </AvatarFallback>
      </Avatar>
      <div>
        <div className="text-sm font-medium">{user?.name}</div>
        <div className="text-xs text-muted-foreground">
          Restaurant administrator
        </div>
      </div>
    </>
  );
}
