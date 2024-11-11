import FormData from "form-data";
import Mailgun from "mailgun.js";

// Reusable email send using Mailgun allowing for a delayed delivery time

// Parameters:
// body : {
//     "to": "kbae1@vols.utk.edu",
//     "subject": "SolSync Daily Update",
//     "text": "Habit: Meditation\nSunrise: 6:03 AM\nSunset: 7:22 PM",
//     "textFormat": "<p>Hello</p>",
//     "deliveryTime": "Tue, 15 Oct 2024 04:09:41 GMT"
// }
// x-api-key with api key as a header

// Returns:
// Error/ Success message
export const handler = async (event) => {
  let emailTo, emailSubject, emailText, emailHTML, deliveryTime

  if (!event.body) {
    // Works in the AWS test environment
    emailTo = event.to;
    emailSubject = event.subject;
    emailText = event.text;
    emailHTML = event.textFormat;
    deliveryTime = event.deliveryTime;
  } else {
    // Works for frontend
    const body = JSON.parse(event.body);
  
    // Email details
    emailTo = body.to;
    emailSubject = body.subject;
    emailText = body.text;
    emailHTML = body.textFormat;
    deliveryTime = body.deliveryTime;
  }

  // Log mail details
  console.log(emailTo);
  console.log(emailSubject);
  console.log(emailText);
  console.log(emailHTML);
  console.log(deliveryTime);

  const mailgun = new Mailgun(FormData);

  // Use API key to begin creating email
  const mg = mailgun.client({
    username: "api",
    key: process.env.EXPO_PUBLIC_MAILGUN_API_KEY,
  });

  try {
    const msg = await mg.messages.create(
      process.env.EXPO_PUBLIC_EXPO_PUBLIC_MAILGUN_URL,
      {
        from: `SolSync <solsync340@gmail.com>`,
        to: [emailTo],
        subject: [emailSubject],
        text: [emailText], // Plain text version
        html: [emailHTML], // HTML version
        "o:deliverytime": [deliveryTime], // Set delivery time
      }
    );

    console.log(msg);

    // Return a success response
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Email sent successfully!",
        eventTo:event,
      }),
    };
  } catch (err) {
    
    console.error(err);

    // Return an error response
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to send email 2.",
        emailTo: emailTo,
        error: err.message
    }),
    };
  }
};
