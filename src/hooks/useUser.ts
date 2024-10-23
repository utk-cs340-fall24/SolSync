import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

import { getUserFromFirestore } from "@/server";
import { SolSyncUser } from "@/types";

import { firebaseAuth } from "../../firebaseConfig";

// define object type that useUser will return
// user: SolSyncUser | null
// userIsLoading: boolean
// reloadUser: () => void or something idk  the syntax

// update the return type of useUser
// add a function inside of useUser called reloadUser that reloads the user and updates the state variable
// update the return type to be an object instead of an array
// go around the repo and everywhere useUser is called, make sure they are getting the variables
// from the object and not an array

// step 1: add type
// step 2:

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
