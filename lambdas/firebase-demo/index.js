const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const handler = async (event) => {
  db = admin.firestore();

  const habitsSnapshot = await db.collection("habits").get();

  const habits = [];
  habitsSnapshot.forEach((doc) => {
    habits.push({ id: doc.id, ...doc.data() });
  });

  const userSnapshot = await db.collection("users").get();

  const users = [];
  userSnapshot.forEach((doc) => {
    users_habits = habits.filter((habit) => habit.userId === doc.id);

    users.push({ id: doc.id, ...doc.data(), habits: users_habits });
  });

  console.log(users)
};

handler()