/* global fetch */

// Parameters:
// modified to take in query parameters (latitude, longitude)

// Returns:
// {
//     "todaySunrise": "2024-09-30T07:03:46.000Z",
//     "todaySunset": "2024-09-30T18:55:20.000Z",
//     "tomorrowSunrise": "2024-10-01T07:04:41.000Z"
// }

export const handler = async function (event) {
  console.log("Received event:", JSON.stringify(event, null, 2));

  let latitude, longitude;

  // Extract latitude and longitude from the event
  if (event.latitude && event.latitude !== "" && event.longitude && event.longitude !== "") {
      latitude = event.latitude;
      longitude = event.longitude;
  } else if (event.body && event.body !== "") {
      const body = JSON.parse(event.body);
      latitude = body.latitude;
      longitude = body.longitude;
  } else if (event.queryStringParameters && event.queryStringParameters.latitude && event.queryStringParameters.longitude) {
      latitude = event.queryStringParameters.latitude;
      longitude = event.queryStringParameters.longitude;
  } else if (event.headers && event.headers.latitude && event.headers.longitude) {
      latitude = event.headers.latitude;
      longitude = event.headers.longitude;
  } else {
      return {
          statusCode: 400,
          body: JSON.stringify({ error: "Latitude and longitude are required" }),
      };
  }

  try {
      const response = await fetch(`https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&timezone=UTC&date_start=today&date_end=tomorrow&time_format=24`);
      const json = await response.json();

      const todayResults = json.results[0];
      const tomorrowResults = json.results[1];

      const todaySunrise = new Date(`${todayResults.date}T${todayResults.sunrise}Z`).toISOString();
      const todaySunset = new Date(`${todayResults.date}T${todayResults.sunset}Z`).toISOString();
      const tomorrowSunrise = new Date(`${tomorrowResults.date}T${tomorrowResults.sunrise}Z`).toISOString();

      const payload = {
          todaySunrise,
          todaySunset,
          tomorrowSunrise,
      };

      return {
          statusCode: 200,
          body: JSON.stringify(payload),
      };
  } catch (error) {
      console.error("Error fetching data:", error);
      return {
          statusCode: 500,
          body: JSON.stringify({ error: "An error occurred while fetching data" }),
      };
  }
};
