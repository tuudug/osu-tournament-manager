"use client";

import { User } from "osu-api-v2-js";
import React, { createContext, useContext, ReactNode, useState } from "react";

const OsuContext = createContext<User | undefined>(undefined);

export function useOsuUser() {
  const context = useContext(OsuContext);
  if (!context) {
    throw new Error("useOsu must be used within an OsuProvider");
  }
  return context;
}

interface OsuProviderProps {
  children: ReactNode;
}

export function OsuUserProvider({ children }: OsuProviderProps) {
  const [user, setUser] = useState<User | undefined>(undefined);

  return <OsuContext.Provider value={user}>{children}</OsuContext.Provider>;
}
