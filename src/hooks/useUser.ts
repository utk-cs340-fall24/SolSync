import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

import { getUserFromFirestore } from "@/server";
import { SolSyncUser } from "@/types";

import { firebaseAuth } from "../../firebaseConfig";

type UseUser = {
  user: SolSyncUser | null;
  userIsLoading: boolean;
  reloadUser: () => Promise<void>;
};

const useUser = (): UseUser => {
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

  return { user, userIsLoading, reloadUser };
};

export default useUser;
