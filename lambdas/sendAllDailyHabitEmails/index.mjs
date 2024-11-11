import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

initializeApp({
  credential: cert({
    type: process.env.FIREBASE_ADMIN_TYPE,
    project_id: process.env.FIREBASE_ADMIN_PROJECT_ID,
    private_key_id: process.env.FIREBASE_ADMIN_PRIVATE_KEY_id,
    private_key: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
    client_email: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_ADMIN_CLIENT_ID,
    auth_uri: process.env.FIREBASE_ADMIN_AUTH_URI,
    token_uri: process.env.FIREBASE_ADMIN_TOKEN_URI,
    auth_provider_x509_cert_url:
      process.env.FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_ADMIN_CLIENT_X509_CERT_URL,
    universe_domain: process.env.FIREBASE_ADMIN_UNIVERSE_DOMAIN,
  }),
});

const db = getFirestore();

const fetchHabits = async () => {
  const habitsSnapshot = await db.collection("habits").get();

  const habits = [];
  habitsSnapshot.forEach((doc) => {
    habits.push({ id: doc.id, ...doc.data() });
  });

  return habits;
};

const fetchUsers = async () => {
  const userSnapshot = await db.collection("users").get();

  const users = [];
  userSnapshot.forEach((doc) => {
    users.push({ id: doc.id, ...doc.data() });
  });

  return users;
};

const sendDailyEmail = async (user, allHabits) => {
  const usersHabits = allHabits.filter(
    (habit) => habit.userId === user.id && habit.emailNotificationEnabled,
  );

  user["habits"] = usersHabits;

  const url = process.env.EXPO_PUBLIC_SENDDAILYHABITEMAIL_API_URL;
  const apiKey = process.env.EXPO_PUBLIC_SENDDAILYHABITEMAIL_API_KEY;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
    },
    body: JSON.stringify({
      user: user,
    }),
  });

  if (response.ok) {
    console.log(`Email was sent to ${user.email}`);
    return;
  }

  console.log(`Unable to send email to ${user.email}`);
};

export const handler = async () => {
  const habits = await fetchHabits();
  const users = await fetchUsers();

  const emailPromises = users.map((user) => sendDailyEmail(user, habits));
  await Promise.all(emailPromises);

  return {
    statusCode: 200,
  };
};
