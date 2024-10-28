import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

import { getUserFromFirestore } from "@/server";
import { SolSyncUser } from "@/types";

import { firebaseAuth } from "../../firebaseConfig";

export type UserContextType = {
  user: SolSyncUser | null;
  userIsLoading: boolean;
  reloadUser: () => Promise<void>;
};

export const UserContext = createContext<UserContextType | null>(null);

type UserProviderProps = {
  children: React.ReactNode;
};

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<SolSyncUser | null>(null);
  const [userIsLoading, setUserIsLoading] = useState(true);

  const loadUser = () => {
    setUserIsLoading(true);

    onAuthStateChanged(firebaseAuth, async (firebaseAuthUser) => {
      const solSyncUser = await getUserFromFirestore(firebaseAuthUser);
      setUser(solSyncUser);
      setUserIsLoading(false);
    });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const reloadUser = async () => {
    setUserIsLoading(true);
    const currentUser = firebaseAuth.currentUser;

    const solSyncUser = await getUserFromFirestore(currentUser);
    setUser(solSyncUser);

    setUserIsLoading(false);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        userIsLoading,
        reloadUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
