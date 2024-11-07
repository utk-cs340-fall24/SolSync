import { SolSyncUser } from "@/types";

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

  // Try sending the email using a get request with the parameters
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "x-api-key": process.env.EXPO_PUBLIC_SENDWELCOMEEMAIL_API_KEY as string,
      },
      body: JSON.stringify({
        userId: email.toString(),
        email: displayName.toString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (err) {
    console.log(err);
  }
}

export async function sendDataEmail(user: SolSyncUser) {
  try {
    const apiUrl = process.env.EXPO_PUBLIC_SENDDATAEMAIL_API_URL;

    if (!apiUrl) {
      throw new Error(
        "SENDDATAEMAIL_API_URL is not defined in the environment variables.",
      );
    }
    const url = new URL(apiUrl);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "x-api-key": process.env.EXPO_PUBLIC_SENDDATAEMAIL_API_KEY as string,
      },
      body: JSON.stringify({
        userId: user.id,
        email: user.email,
      }),
    });

    const jsonData = await response.json();

    console.log(jsonData);
  } catch (err) {
    console.log(err);
  }
}
