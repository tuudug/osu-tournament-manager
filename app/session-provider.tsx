import { headers } from "next/headers";
import { getSessionUser } from "@/utils/auth/get-session-user";
import { Providers } from "./providers";

export async function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get initial session data on server
  const { user } = await getSessionUser();

  return <Providers initialUser={user}>{children}</Providers>;
}
