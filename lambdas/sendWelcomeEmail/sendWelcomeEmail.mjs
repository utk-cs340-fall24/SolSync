// Takes in an email and a name
// Send welcome email, should be triggered when user signs up

export const handler = async (event) => {
  // Verify the parameters
  console.log("Received event:", JSON.stringify(event, null, 2));

  let emailTo, emailName;

  // Extract email details from the event
  if (event.to && event.name) {
    emailTo = event.to;
    emailName = event.name;
  } else if (event.body) {
    try {
      const body = JSON.parse(event.body);
      emailTo = body.to;
      emailName = body.name; // Ensure name is extracted
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
    event.queryStringParameters.name
  ) {
    // Try various methods to parse the emailTo and emailHabit
    emailTo = event.queryStringParameters.to;
    emailName = event.queryStringParameters.name;
  } else if (event.headers && event.headers.to && event.headers.name) {
    emailTo = event.headers.to;
    emailName = event.headers.name;
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Email recipient and name are required" }),
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
    <div style="font-family: Arial, sans-serif; padding: 20px; background: linear-gradient(191.16deg, #CC9ED0 3.26%, #F7A592 49.91%, #FFD18A 96.57%); color: #000; text-align: center;">
      <div style="background-color: rgba(255, 255, 255, 0.8); padding: 15px; border-radius: 8px; display: inline-block; text-align: left;">
        <h1 style="color: #f4a58a; text-align: center;">Welcome to SolSync!</h1>
        <p style="font-size: 20px;">
          We are thrilled to have you join our community! At SolSync, we believe in the power of daily reflection and personal growth.
        </p>
        <p style="font-size: 18px;">
          SolSync helps you quickly and easily keep track of your habits, making aligning habits with sunrise and sunset times easy.
        </p>
        <h2 style="color: #b38acb;">Account Details</h2>
        <p style="font-size: 18px;">
          Name: ${emailName}
        </p>
        <p style="font-size: 18px;">
          Email: ${emailTo}
        </p>
        <h2 style="color: #b38acb;">Getting Started</h2>
        <p style="font-size: 18px;">
          Here are a few tips for using SolSync:
        </p>
        <ul style="font-size: 18px; margin: 10px 0; padding-left: 20px;">
          <li>Customize your icons, habits, and profile picture to make this app uniquely yours.</li>
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
    const response = await fetch(process.env.EXPO_PUBLIC_SENDEMAIL_API_URL, {
      method: "POST",
      headers: {
        "x-api-key": process.env.EXPO_PUBLIC_SENDEMAIL_API_KEY,
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

    // Return failure status
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to send email 1.",
        error: err.message,
      }),
    };
  }
};
