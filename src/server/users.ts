import { User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { Location, SolSyncUser } from "@/types";

import { db } from "../../firebaseConfig";

export const getUser = async (
  user: User | null,
): Promise<SolSyncUser | null> => {
  if (!user) {
    return null;
  }

  const userDoc = await getDoc(doc(db, "users", user.uid));

  const userData = userDoc.data();

  if (!userData) {
    return null;
  }

  return {
    ...user,
    displayName: userData.displayName,
    location: {
      latitude: userData.latitude,
      longitude: userData.longitude,
    },
  };
};

export const setUser = async (
  user: User,
  location: Location,
  displayName: string,
) => {
  await setDoc(doc(db, "users", user.uid), {
    displayName: displayName,
    latitude: location.latitude,
    longitude: location.longitude,
  });
};
