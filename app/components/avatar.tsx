import { useUser } from "@/providers/user-provider";
import { Avatar, DarkThemeToggle, Dropdown, Navbar } from "flowbite-react";
import { signIn, signOut } from "next-auth/react";

export function HeaderAvatar() {
  const { user } = useUser();

  return (
    <Dropdown
      arrowIcon={false}
      inline
      label={
        <Avatar
          alt="User settings"
          img={user ? `https://a.ppy.sh/${user?.id}` : "https://a.ppy.sh/1"}
          rounded
        />
      }
    >
      <Dropdown.Header>
        {user && (
          <span className="block text-sm">Signed in as {user?.username}</span>
        )}
        {!user && <span className="block text-sm">Not signed in</span>}
      </Dropdown.Header>
      {user && (
        <Dropdown.Item onClick={() => signOut()}>Sign out</Dropdown.Item>
      )}
      {!user && (
        <Dropdown.Item onClick={() => signIn("osu", { callbackUrl: "/auth" })}>
          Sign in
        </Dropdown.Item>
      )}
    </Dropdown>
  );
}
