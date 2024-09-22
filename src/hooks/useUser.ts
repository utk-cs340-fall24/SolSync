import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { firebaseAuth } from "../../firebaseConfig";

const useUser = (): User | undefined => {
  const [user, useUser] = useState<User | undefined>();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      useUser(user ? user : undefined);
    });
  }, []);

  return user;
};

export default useUser;
