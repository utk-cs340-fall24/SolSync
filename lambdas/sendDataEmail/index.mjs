import dayjs from "dayjs";
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

const doesUserExist = async (userId) => {
  const userSnapshot = await db
    .collection("users")
    .where("id", "==", userId)
    .get();

  return !userSnapshot.empty;
};

const getHabitsByUserId = async (userId) => {
  const habitsSnapshot = await db
    .collection("habits")
    .where("userId", "==", userId)
    .get();

  const historySnapshot = await db
    .collection("history")
    .where("userId", "==", userId)
    .get();

  const history = [];
  historySnapshot.forEach((doc) => {
    history.push({
      id: doc.id,
      habitId: doc.data().habitId,
      date: doc.data().date.toDate(),
    });
  });

  const habits = [];
  habitsSnapshot.forEach((doc) => {
    const habitHistory = history
      .filter((history) => history.habitId === doc.id)
      .map((history) => dayjs(history.date));

    habits.push({
      id: doc.id,
      name: doc.data().name,
      datesCompleted: habitHistory,
    });
  });

  return habits;
};

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Only POST requests are allowed" }),
    };
  }

  const body = JSON.parse(event.body || "{}");

  const { userId } = body;
  if (!userId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "userId not provided in the body" }),
    };
  }

  const isUserInFirebase = await doesUserExist(userId);

  if (!isUserInFirebase) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "invalid userId" }),
    };
  }

  const habits = await getHabitsByUserId(userId);

  return {
    statusCode: 200,
    body: JSON.stringify(habits),
  };
};
