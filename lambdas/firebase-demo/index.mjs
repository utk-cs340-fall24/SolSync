import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { promises as fs } from 'fs';

const serviceAccountPath = "./serviceAccount.json"
const serviceAccount = JSON.parse(await fs.readFile(serviceAccountPath, 'utf-8'));

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

export const handler = async () => {
  const habitsSnapshot = await db.collection("habits").get();

  const habits = [];
  habitsSnapshot.forEach((doc) => {
    habits.push({ id: doc.id, ...doc.data() });
  });

  const userSnapshot = await db.collection("users").get();

  const users = [];
  userSnapshot.forEach((doc) => {
    const users_habits = habits.filter((habit) => habit.userId === doc.id);

    users.push({ id: doc.id, ...doc.data(), habits: users_habits });
  });

  return users;
};