import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { User } from "osu-api-v2-js";
import { useSession } from "next-auth/react";

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
    // Only fetch if we don't have an initial user and session exists
    if (!user && session?.accessToken) {
      fetch(`/api/osu/get-own-data`)
        .then((res) => res.json())
        .then(({ user }) => setUser(user))
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [session, user]);

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
