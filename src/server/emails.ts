export async function sendWelcomeEmail(displayName: string, email: string) {
  // Check if the URL is valid
  const apiUrl = process.env.EXPO_PUBLIC_SENDWELCOMEEMAIL_API_URL;

  // Check if the API URL is defined
  if (!apiUrl) {
    throw new Error(
      "SENDWELCOMEEMAIL_API_URL is not defined in the environment variables.",
    );
  }

  const url = new URL(apiUrl);

  // Adding query parameters by using to and name
  url.searchParams.append("to", email.toString());
  url.searchParams.append("name", displayName.toString());

  // Try sending the email using a get request with the parameters
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-api-key": process.env.EXPO_PUBLIC_SENDWELCOMEEMAIL_API_KEY as string,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (err) {
    console.error(err);
  }
}
