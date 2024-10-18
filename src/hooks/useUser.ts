import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

import { getUser } from "@/server";
import { SolSyncUser } from "@/types";

import { firebaseAuth } from "../../firebaseConfig";

const useUser = (): SolSyncUser | null => {
  const [user, setUser] = useState<SolSyncUser | null>(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (firebaseAuthUser) => {
      getUser(firebaseAuthUser).then((user) => {
        setUser(user);
      });
    });
  }, []);

  return user;
};

export default useUser;
