// Takes in an email and the name used

export const handler = async (event) => {
  // Verify the parameters
  console.log("Received event:", JSON.stringify(event, null, 2));

  let emailTo, emailHabit;

  // Extract email details from the event
  if (event.to && event.to !== "" && event.habit && event.habit !== "") {
    emailTo = event.to;
    emailHabit = event.habit;
  } else if (event.body && event.body !== "") {
    try {
      const body = JSON.parse(event.body);
      emailTo = body.to;
      emailHabit = body.habit; // Ensure habit is extracted
    } catch (error) {
      console.error("Failed to parse JSON body:", error);
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid JSON body" }),
      };
    }
  } else if (
    event.queryStringParameters &&
    event.queryStringParameters.to &&
    event.queryStringParameters.habit
  ) {
    // Try various methods to parse the emailTo and emailHabit
    emailTo = event.queryStringParameters.to;
    emailHabit = event.queryStringParameters.habit;
  } else if (event.headers && event.headers.to && event.headers.habit) {
    emailTo = event.headers.to;
    emailHabit = event.headers.habit;
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Email recipient and habit are required" }),
    };
  }

  // Create a new date object for the current date
  let now = new Date();

  // Add 10 seconds to allow for both lambdas to finish
  now.setSeconds(now.getSeconds() + 10);

  // Convert to RFC 2822 format to match mailgun's requirements
  let rfc2822Time = now.toUTCString();

  // Make sure this variable is correct
  console.log(rfc2822Time);

  // Define HTML
  const emailHTML = `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #FFCC80; color: #000; text-align: center;">
        <h1 style="color: #D65F0D;">Welcome to SolSync!</h1>
        <div style="background-color: rgba(255, 255, 255, 0.8); padding: 15px; border-radius: 8px; display: inline-block; text-align: left;">
            <p style="font-size: 20px;">
                We are thrilled to have you join our community! At SolSync, we believe in the power of daily reflection and personal growth.
            </p>
            <p style="font-size: 18px;">
                SolSync helps you quickly and easily keep track of your habits, making aligning habits with sunrise and sunset times easy.
            </p>
  
            <h2 style="color: #D65F0D;">Account Details</h2>
            <p style="font-size: 18px;">
                Email: ${emailTo}
            </p>
            <p style="font-size: 18px;">
                Habit: ${emailHabit}
            </p>
  
  
            <h2 style="color: #D65F0D;">Getting Started</h2>
            <p style="font-size: 18px;">
                Here are a few tips for using SolSync:
            </p>
            <ul style="font-size: 18px; margin: 10px 0; padding-left: 20px;">
                <li>Customize your icons and profile picture to make this app uniquely yours.</li>
                <li>Log into the app daily to track your progress.</li>
                <li>Keep your email updated to receive daily reminders.</li>
            </ul>
            <p style="font-size: 18px;">
                Remember, every small step counts on your habit-building journey!
            </p>
        </div>
    </div>
    `;

  try {
    // Fetch the sendEmail API with the required body
    const response = await fetch(process.env.SENDEMAIL_API_URL, {
      method: "POST",
      headers: {
        "x-api-key": process.env.SENDEMAIL_API_KEY,
      },
      body: JSON.stringify({
        to: emailTo,
        subject: "Welcome to SolSync",
        text: "We are glad you have chosen to become a part of the SolSync community.",
        textFormat: emailHTML,
        deliveryTime: rfc2822Time,
      }),
    });

    // Convert to JSON
    const jsonData = await response.json();
    if (response.ok) {
      // Return success message and event data
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Email sent successfully!",
          event: jsonData.eventTo,
          data: jsonData.data,
        }),
      };
    } else {
      // Log the response data for debugging
      console.log(jsonData);

      // Return failure status and error from sendEmail
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "Failed to send email.",
          error: jsonData.message || "Unknown error",
          error2: jsonData.error || "Unknown error",
          emailTo: jsonData.emailTo,
        }),
      };
    }
  } catch (err) {
    // Log the error
    console.log(err);

    // Return failure status and
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to send email 1.",
        error: err.message,
      }),
    };
  }
};
