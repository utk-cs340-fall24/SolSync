import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { promises as fs } from "fs";
import dayjs from "dayjs";

const serviceAccountPath = "./lambdas/firebase-demo/serviceAccount.json";
const serviceAccount = JSON.parse(
  await fs.readFile(serviceAccountPath, "utf-8"),
);

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

const getSunriseSunsetTime = async (user) => {
  const url = new URL(process.env.EXPO_PUBLIC_GETSUNRISESUNSET_API_URL);

  url.searchParams.append("latitude", user.latitude);
  url.searchParams.append("longitude", user.longitude);

  let sunrise = null;
  let sunset = null;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-api-key": process.env.EXPO_PUBLIC_SENDWDAILYEMAIL_API_KEY,
      },
    });

    const jsonData = await response.json();

    sunrise = dayjs(jsonData.todaySunrise);
    sunset = dayjs(jsonData.todaySunset);
  } catch (err) {
    console.log(err);
  }

  return [sunrise, sunset];
};

const constructEmailBody = async (user) => {
  const [sunrise, sunset] = await getSunriseSunsetTime(user);

  let habitHTML = "";

  let habitTime = null;

  user.habits.forEach((habit) => {
    switch (habit.notificationPeriod) {
      case "sunrise":
        habitTime = sunrise;
        break;
      case "sunset":
        habitTime = sunset;
        break;
      default:
        console.log("Incorrect notification period");
        return;
    }

    switch (habit.offsetDirection) {
      case "before":
        habitTime = habitTime.subtract(habit.hourOffset, "hour");
        habitTime = habitTime.subtract(habit.minuteOffset, "minute");
        break;
      case "after":
        habitTime = habitTime.add(habit.hourOffset, "hour");
        habitTime = habitTime.add(habit.minuteOffset, "minute");
        break;
      default:
        console.log("Incorrect offset direction");
        return;
    }

    const getHabitTimeMessage = (habit) => {
      if (habit.hourOffset === 0 && habit.minuteOffset === 0) {
        return `at ${habit.notificationPeriod}`;
      }

      let habitTimeMessage = "";

      if (habit.hourOffset !== 0) {
        habitTimeMessage += `${habit.hourOffset} ${habit.hourOffset === 1 ? "hour" : "hours"}`;
      }

      if (habit.minuteOffset !== 0) {
        if (habitTimeMessage != "") habitTimeMessage += " ";
        habitTimeMessage += `${habit.minuteOffset} ${habit.minuteOffset === 1 ? "minute" : "minutes"}`;
      }

      habitTimeMessage += ` ${habit.offsetDirection} ${habit.notificationPeriod}`;

      return habitTimeMessage;
    };

    const habitTimeMessage = getHabitTimeMessage(habit);

    habitHTML += `
      <p style="font-size: 18px;">
        <strong style="color: #D65F0D;">${habit.name}:</strong> <span style="color: #000;">${habitTime.format("h:mm A")} (${habitTimeMessage})</span>
      </p>`;
  });

  const emailHTML = `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #FFCC80; color: #000; text-align: center;">
      <h1 style="color: #D65F0D;">SolSync Daily Reflection</h1>
      <div style="background-color: rgba(255, 255, 255, 0.8); padding: 15px; border-radius: 8px; display: inline-block; text-align: left;">
        <p style="font-size: 20px;">
          Embrace the beauty of each day. Remember to practice your habits!
        </p>
              <p style="font-size: 18px;">
          <strong style="color: #D65F0D;">Sunrise:</strong> <span style="color: #000;">${sunrise.format("h:mm A")}</span>
        </p>
        <p style="font-size: 18px;">
          <strong style="color: #D65F0D;">Sunset:</strong> <span style="color: #000;">${sunset.format("h:mm A")}</span>
        </p>
        <h2 style="color: #D65F0D;">Upcoming Habit (${dayjs().format("dddd, MMMM D YYYY")}):</h2>
        ${habitHTML}
        <h2 style="color: #D65F0D;">Tips for Your Habit</h2>
        <ul style="font-size: 18px; margin: 10px 0; padding-left: 20px;">
          <li>Set a specific time to practice your habit each day.</li>
          <li>Track your progress to stay motivated.</li>
          <li>Find a friend to share your goals with.</li>
        </ul>
      </div>
    </div>
  `;

  return emailHTML;
};

const sendDailyEmail = async (user, emailBody) => {
  const sendTime = dayjs().add(20, "second");

  try {
    const response = await fetch(process.env.EXPO_PUBLIC_SENDEMAIL_API_URL, {
      method: "POST",
      headers: {
        "x-api-key": process.env.EXPO_PUBLIC_SENDEMAIL_API_KEY,
      },
      body: JSON.stringify({
        to: user.email,
        subject: "Welcome to SolSync",
        text: "We are glad you have chosen to become a part of the SolSync community.",
        textFormat: emailBody,
        deliveryTime: sendTime.format("ddd, DD MMM YYYY HH:mm:ss ZZ"),
      }),
    });

    const jsonData = await response.json();
    if (response.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Email sent successfully!",
          event: jsonData.eventTo,
          data: jsonData.data,
        }),
      };
    }

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to send email.",
        error: jsonData.message || "Unknown error",
        error2: jsonData.error || "Unknown error",
        emailTo: jsonData.emailTo,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to send email 1.",
        error: err.message,
      }),
    };
  }
};

export const handler = async () => {
  const habitsSnapshot = await db.collection("habits").get();

  const habits = [];
  habitsSnapshot.forEach((doc) => {
    habits.push({ id: doc.id, ...doc.data() });
  });

  const userSnapshot = await db.collection("users").get();

  const users = [];
  userSnapshot.forEach((doc) => {
    const users_habits = habits.filter(
      (habit) => habit.userId === doc.id && habit.emailNotificationEnabled,
    );

    users.push({ id: doc.id, ...doc.data(), habits: users_habits });
  });

  users.forEach(async (user) => {
    if (user.habits.length === 0) {
      return;
    }

    const emailBody = await constructEmailBody(user);

    await sendDailyEmail(user, emailBody);

    console.log(`Email sent to ${user.displayName} at ${user.email}`)
  });
};

handler()