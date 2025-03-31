// import { getServerSession } from 'next-auth'
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { redirect } from "next/navigation";

// Type Imports
// import type { Locale } from '@configs/i18n'
// import type { ChildrenType } from '@core/types'

// Component Imports
// import AuthRedirect from '@/components/AuthRedirect'

export default async function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  return <>{session ? children : redirect("/")}</>;
}
