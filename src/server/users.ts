import { User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { Location, SolSyncUser } from "@/types";

import { db } from "../../firebaseConfig";

export const getUserFromFirestore = async (
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

  if (!user.email) {
    return null;
  }

  return {
    uid: user.uid,
    email: user.email,
    displayName: userData.displayName,
    location: {
      latitude: userData.latitude,
      longitude: userData.longitude,
    },
  };
};

export const upsertUser = async (
  user: SolSyncUser,
  email: string,
  location: Location,
  displayName: string,
) => {
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    email: email,
    displayName: displayName,
    latitude: location.latitude,
    longitude: location.longitude,
  });
};
