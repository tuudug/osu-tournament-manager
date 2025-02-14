import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { User } from "osu-api-v2-js";
import { useSession, signOut } from "next-auth/react";

interface UserContextType {
  user: User | null | undefined;
  setUser: (user: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
  initialUser?: User | null;
}

export function UserProvider({ children, initialUser }: UserProviderProps) {
  const [user, setUser] = useState<User | null | undefined>(initialUser);
  const { data: session, status } = useSession();

  useEffect(() => {
    // Wait until session is loaded
    if (status === "loading") return;

    if (status === "authenticated" && session?.accessToken) {
      // Session is valid, fetch user data if needed
      if (!user) {
        fetch(`/api/osu/get-own-data`)
          .then((res) => {
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
          })
          .then(({ user }) => setUser(user))
          .catch((error) => {
            console.error("Error fetching user data:", error);
            setUser(null);
            signOut({ redirect: false });
          });
      }
    } else if (user) {
      // No valid session but we have a user, clear it
      setUser(null);
      signOut({ redirect: false });
    }
  }, [session, status, user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
