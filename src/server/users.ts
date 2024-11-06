import { User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { Avatar, Location, SolSyncUser } from "@/types";

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
    id: user.uid,
    email: user.email,
    displayName: userData.displayName,
    location: {
      latitude: userData.latitude,
      longitude: userData.longitude,
    },
    avatar: {
      emoji: userData.emoji,
      background: userData.background,
    },
  };
};

export const upsertUser = async (
  user: SolSyncUser,
  email: string,
  location: Location,
  displayName: string,
  avatar: Avatar,
) => {
  await setDoc(doc(db, "users", user.id), {
    id: user.id,
    email: email,
    displayName: displayName,
    latitude: location.latitude,
    longitude: location.longitude,
    emoji: avatar.emoji,
    background: avatar.background,
  });
};
