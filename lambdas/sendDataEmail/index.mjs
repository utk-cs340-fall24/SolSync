import dayjs from "dayjs";
import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";

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

  const startOfMonth = dayjs().startOf("month");
  const endOfMonth = dayjs().endOf("month");

  const startTimestamp = Timestamp.fromDate(startOfMonth.toDate());
  const endTimestamp = Timestamp.fromDate(endOfMonth.toDate());

  const historySnapshot = await db
    .collection("history")
    .where("userId", "==", userId)
    .where("date", ">=", startTimestamp)
    .where("date", "<=", endTimestamp)
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

const constructEmailBody = (habits) => {
  // Construct the email body header
  const habitHTML = "Your Habit History";

  // Set up basic HTML
  let emailHTML = `
  <div style="font-family: Arial, sans-serif; padding: 20px; background: linear-gradient(191.16deg, #CC9ED0 3.26%, #F7A592 49.91%, #FFD18A 96.57%); color: #000; text-align: center;">
    <div style="background-color: rgba(255, 255, 255, 0.8); padding: 15px; border-radius: 8px; display: inline-block; text-align: center; min-width: 80%">
      <h1 style="color: #f4a58a; text-align: center; font-size: 24px; margin: 0;">${habitHTML}</h1>
      <p style="font-size: 20px; margin-top: 15px;">
        You have recently requested your habit history.
      </p>
  `;

  // Iterate through each habit and generate a calendar for each
  habits.forEach((habit) => {
    const markedDates = habit.datesCompleted.map((date) =>
      new Date(date).getDate(),
    );

    // Fetch current month and year
    const currentMonth = dayjs().month();
    const currentYear = dayjs().year();

    // Generate the calendar for the required month
    const calendarHTML = generateCalendarHTML(currentMonth, currentYear, markedDates);

    // Add the calendarHTML to the email HTML
    emailHTML += `
      <h2 style="color: #f4a58a; font-size: 22px; margin: 20px 0 5px;">${habit.name}</h2>
      ${calendarHTML}
    `;
  });

  // Closing the email HTML
  emailHTML += `
    </div>
  </div>
  `;

  // Return the full email HTML
  return emailHTML;
};

// Generates the calendar in HTML given a month and year
function generateCalendarHTML(month, year, markedDates) {
  // Inspiration for this calendar: https://www.geeksforgeeks.org/design-a-calendar-using-html-and-css/
  const firstDay = new Date(year, month, 1).getDay();
  const numDays = new Date(year, month + 1, 0).getDate();

  // Store a list of month names to print
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = monthNames[month];

  // Create a table with a month label
  let table = `<h4>${monthName} ${year}</h4>`;
  table +=
    "<table style='border-collapse: collapse; width: 50%; margin-top: 20px; margin-left: auto; margin-right: auto'><thead><tr>";

  // Days of the week header
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Add formatting for each day
  daysOfWeek.forEach((day) => {
    table += `<th style='padding: 10px; text-align: center; background-color: #D8B9E6; font-weight: bold;'>${day}</th>`;
  });
  table += "</tr></thead><tbody>";

  // Iterate through each day of the week and fill in the table
  let currentDay = 1;
  for (let row = 0; currentDay <= numDays; row++) {
    table += "<tr>";
    for (let col = 0; col < 7; col++) {
      if (row === 0 && col < firstDay) {
        table += "<td style='background-color: #efefef;'></td>";
      } else if (currentDay <= numDays) {
        const isMarked = markedDates.includes(currentDay);
        table += `<td style='padding: 10px; text-align: center; background-color: #eaeaea; font-size: 18px; ${isMarked ? "background-color: #F4A58A;" : ""}'>${currentDay}</td>`;
        currentDay++;
      } else {
        table += "<td style='background-color: #efefef;'></td>";
      }
    }
    table += "</tr>";
  }
  table += "</tbody></table>";

  // Return the table / calendar
  return table;
}

// Sends the email
const sendDataEmail = async (userEmail, emailBody) => {

  // Check to make sure emailBody is as intended
  console.log(emailBody);

  // Add send time as a buffer for the email
  const sendTime = dayjs().add(20, "second");

  // Try sending the email
  try {
    const response = await fetch(
      process.env.EXPO_PUBLIC_SENDEMAIL_API_URL,
      {
        method: "POST",
        headers: {
          "x-api-key": process.env.EXPO_PUBLIC_SENDEMAIL_API_KEY,
        },
        body: JSON.stringify({
          to: userEmail,
          subject: "Habit Data Request",
          text: "Habit Request",
          textFormat: emailBody,
          deliveryTime: sendTime.format("ddd, DD MMM YYYY HH:mm:ss ZZ"),
        }),
      },
    );

    // Store the json and make sure the email sent successfully
    const jsonData = await response.json();
    if (response.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Email sent successfully!",
        }),
      };
    }

    // Return other error codes
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

// Lambda function runs
export const handler = async (event) => {

  // Ensure that the request is a POST request
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Only POST requests are allowed" }),
    };
  }

  // Extract userId and email from the event body (if available)
  let userId, email;

  // To ensure the body can be parsed in AWS lambda console and from app
  if (event.body) {
    const body = JSON.parse(event.body);
    userId = body.userId;
    email = body.email;
  } else {
    userId = event.userId;
    email = event.email;
  }

  // Check to make sure the variables are valid
  if (!userId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "userId not provided in the body" }),
    };
  } if (!email) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "email not provided in the body" }),
    };
  }

  const isUserInFirebase = await doesUserExist(userId);

  if (!isUserInFirebase) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "invalid userId" }),
    };
  }

  // Fetch habits
  const habits = await getHabitsByUserId(userId);

  console.log(habits);

  // Construct the email body and send the email
  const emailBody = constructEmailBody(habits);
  console.log(emailBody);
  await sendDataEmail(email, emailBody);

  // Success
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Email sent successfully!",
      event: habits
    }),
  };
};

handler()