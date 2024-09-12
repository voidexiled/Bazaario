import type { User } from "@supabase/supabase-js";
import { createContext, useContext, useState } from "react";

type AuthContextType = {
  user: User | null;
  setUser: (user: User) => void;
  signOut: () => void;
};
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const signOut = async () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
