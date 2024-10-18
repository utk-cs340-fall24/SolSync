import { collection, getDocs, query, where } from "firebase/firestore";

import { History, SolSyncUser } from "@/types";

import { db } from "../../firebaseConfig";

export const getHistory = async (user: SolSyncUser): Promise<History[]> => {
  const historyQuery = await getDocs(
    query(collection(db, "history"), where("userId", "==", user?.uid)),
  );

  const history = historyQuery.docs.map(
    (doc) =>
      ({
        id: doc.id,
        date: doc.data().date.toDate(),
        habitId: doc.data().habitId,
        userId: doc.data().userId,
      }) as History,
  );

  return history;
};
