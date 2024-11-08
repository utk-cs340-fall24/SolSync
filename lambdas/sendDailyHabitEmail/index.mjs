import dayjs from "dayjs";

const dateTimeToDayJS = (date, time) => {
  const format = "DD-MM-YYYY HH:mm";

  return dayjs(`${date} ${time}`, format);
};

const getSunriseSunsetTime = async (user) => {
  try {
    const response = await fetch(
      `https://api.sunrisesunset.io/json?lat=${user.latitude}&lng=${user.latitude}&time_format=24`,
    );

    const json = await response.json();

    const { date, sunrise, sunset } = json.results;

    const sunriseTime = dateTimeToDayJS(date, sunrise);
    const sunsetTime = dateTimeToDayJS(date, sunset);

    return [sunriseTime, sunsetTime];
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return [dayjs(), dayjs()];
};

const getHabitTimeMessage = (habit) => {
  if (habit.hourOffset === 0 && habit.minuteOffset === 0) {
    return `at ${habit.notificationPeriod}`;
  }

  let habitTimeMessage = "";

  if (habit.hourOffset !== 0) {
    habitTimeMessage += `${habit.hourOffset} ${habit.hourOffset === 1 ? "hour" : "hours"}`;
  }

  if (habit.minuteOffset !== 0) {
    if (habitTimeMessage !== "") habitTimeMessage += " ";
    habitTimeMessage += `${habit.minuteOffset} ${habit.minuteOffset === 1 ? "minute" : "minutes"}`;
  }

  habitTimeMessage += ` ${habit.offsetDirection} ${habit.notificationPeriod}`;

  return habitTimeMessage;
};

const constructEmailBody = async (user) => {
  const [sunrise, sunset] = await getSunriseSunsetTime(user);

  let habitHTML = "";

  user.habits = user.habits.map((habit) => {
    let habitTime = null;

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

    return { ...habit, todaysTime: habitTime };
  });

  user.habits.sort((habit1, habit2) =>
    habit1.todaysTime.isBefore(habit2.todaysTime) ? -1 : 1,
  );

  user.habits.forEach((habit) => {
    const habitTimeMessage = getHabitTimeMessage(habit);

    habitHTML += `
        <p style="font-size: 18px;">
            <strong style="color: #b38acb;">${habit.name}:</strong> <span style="color: #000;">${habit.todaysTime.format("h:mm A")} (${habitTimeMessage})</span>
        </p>`;
  });

  const emailHTML = `
    <div style="font-family: Arial, sans-serif; padding: 20px; background: linear-gradient(191.16deg, #CC9ED0 3.26%, #F7A592 49.91%, #FFD18A 96.57%); color: #000; text-align: center;">
        <div style="background-color: rgba(255, 255, 255, 0.8); padding: 15px; border-radius: 8px; display: inline-block; text-align: left;">
            <h1 style="color: #f4a58a; text-align: center">SolSync Daily Reflection</h1>
            <p style="font-size: 20px;">
                Embrace the beauty of each day. Remember to practice your habits!
            </p>
            <p style="font-size: 18px;">
                <strong style="color: #b38acb;">Sunrise:</strong> <span style="color: #000;">${sunrise.format("h:mm A")}</span>
            </p>
            <p style="font-size: 18px;">
                <strong style="color: #b38acb;">Sunset:</strong> <span style="color: #000;">${sunset.format("h:mm A")}</span>
            </p>
            <h2 style="color: #f4a58a;">Upcoming Habits (${dayjs().format("dddd, MMMM D YYYY")})</h2>
            ${habitHTML}
            <h2 style="color: #f4a58a;">Tips for Your Habit</h2>
            <ul style="font-size: 18px; margin: 10px 0; padding-left: 20px;">
                <li>Set a specific time to practice your habit each day.</li>
                <li>Track your progress to stay motivated.</li>
                <li>Find a friend to share your goals with.</li>
            </ul>
        </div>
    </div>`;

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

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
    };
  }

  const body = JSON.parse(event.body || "{}");

  const { user } = body;
  if (!user) {
    return {
      statusCode: 400,
    };
  }

  const { id, email, displayName, latitude, longitude, habits } = user;
  if (!id || !email || !displayName || !latitude || !longitude || !habits) {
    return {
      statusCode: 400,
    };
  }

  const emailBody = await constructEmailBody(user);

  await sendDailyEmail(user, emailBody);

  return {
    statusCode: 200,
  };
};
