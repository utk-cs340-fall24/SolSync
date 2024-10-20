import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

import { getUser } from "@/server";
import { SolSyncUser } from "@/types";

import { firebaseAuth } from "../../firebaseConfig";

const useUser = (): [SolSyncUser | null, boolean] => {
  const [user, setUser] = useState<SolSyncUser | null>(null);
  const [userIsLoading, setUserIsLoading] = useState(true);

  useEffect(() => {
    setUserIsLoading(true);

    onAuthStateChanged(firebaseAuth, (firebaseAuthUser) => {
      getUser(firebaseAuthUser).then((user) => {
        setUser(user);
        setUserIsLoading(false);
      });
    });
  }, []);

  return [user, userIsLoading];
};

export default useUser;
