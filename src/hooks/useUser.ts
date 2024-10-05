import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { firebaseAuth } from "../../firebaseConfig";

const useUser = (): User | null => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user ? user : null);
    });
  }, []);

  return user;
};

export default useUser;
