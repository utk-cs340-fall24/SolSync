// Schedules daily emails for tomorrow at noon

// Currently uses predetermined times for sunrise and sunset

// TODO: Pass in variables to the lambda event to change daily content email

export const handler = async (event) => {
    // Create a new date object for the current date
    let now = new Date();
  
    // Set to tomorrow by adding one day
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
  
    // Set time to noon (12:00 PM)
    tomorrow.setHours(20, 4, 0, 0);
  
    // Convert to RFC 2822 format to match mailgun's requirements
    let rfc2822Time = tomorrow.toUTCString();
  
    // Make sure this variable is correct
    console.log(rfc2822Time);
  
    // Define HTML (easiest way to maintain readability when going to JSON)
    const emailHTML = `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #FFCC80; color: #000; text-align: center;">
        <h1 style="color: #D65F0D;">SolSync Daily Reflection</h1>
        <div style="background-color: rgba(255, 255, 255, 0.8); padding: 15px; border-radius: 8px; display: inline-block; text-align: left;">
            <p style="font-size: 20px;">
                Embrace the beauty of each day. Remember to practice your habits!
            </p>
            <p style="font-size: 18px;">
                <strong style="color: #D65F0D;">Habit:</strong> <span style="color: #000;">Meditation</span>
            </p>
            <p style="font-size: 18px;">
                <strong style="color: #D65F0D;">Sunrise:</strong> <span style="color: #000;">6:02AM</span>
            </p>
            <p style="font-size: 18px;">
                <strong style="color: #D65F0D;">Sunset:</strong> <span style="color: #000;">7:50PM</span>
            </p>
            <h2 style="color: #D65F0D;">Tips for Your Habit</h2>
            <ul style="font-size: 18px; margin: 10px 0; padding-left: 20px;">
                <li>Set a specific time to practice your habit each day.</li>
                <li>Track your progress to stay motivated.</li>
                <li>Find a friend to share your goals with.</li>
            </ul>
        </div>
    </div>
    `;
  
    try {
      // Fetch the sendEmail API with the required body
      const response = await fetch(
        process.env.EXPO_PUBLIC_SENDEMAIL_API_URL,
        {
          method: "POST",
          headers: {
            "x-api-key": process.env.EXPO_PUBLIC_SENDEMAIL_API_KEY,
          },
          body: JSON.stringify({
            to: "kbae1@vols.utk.edu",
            subject: "SolSync Daily Update",
            text: "Habit: Meditation\nSunrise: 6:03 AM\nSunset: 7:22 PM",
            textFormat: emailHTML,
            deliveryTime: rfc2822Time,
          }),
        },
      );
  
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
  