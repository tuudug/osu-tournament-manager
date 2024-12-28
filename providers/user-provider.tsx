import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { User } from "osu-api-v2-js";
import { signOut, useSession } from "next-auth/react";

interface UserContextType {
  user: User | undefined;
  setUser: (user: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>();
  const { data: session, status } = useSession();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (status === "loading") return;

    const initializeUser = async () => {
      if (session && !user) {
        try {
          const response = await fetch(`/api/osu/get-own-data`);
          if (!response.ok) {
            signOut();
            throw new Error("Failed to fetch user data");
          }
          const json = await response.json();
          setUser(json.user);
        } catch (error) {
          console.error("Error initializing user:", error);
        }
      }
      setIsInitialized(true);
    };

    initializeUser();
  }, [session, status, user]);

  if (!isInitialized) {
    return <LoadingScreen />;
  }

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

function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-800">
      <div className="flex items-center justify-center gap-2">
        <div className="mt-3 text-black dark:text-white">Loading</div>
        <Loader />
      </div>
    </div>
  );
}

function Loader() {
  return (
    <div className="mt-4">
      <svg
        className="mx-auto size-5 animate-spin text-black dark:text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
}
