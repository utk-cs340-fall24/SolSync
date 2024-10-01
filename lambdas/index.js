/* global fetch */

// Parameters:
// body: {
//     "lat": "38.907192",
//     "lng": "-77.036873"
// }
// x-api-key with api key as a header

// Returns:
// {
//     "todaySunrise": "2024-09-30T07:03:46.000Z",
//     "todaySunset": "2024-09-30T18:55:20.000Z",
//     "tomorrowSunrise": "2024-10-01T07:04:41.000Z"
// }

export const handler = async (event) => {
  let lat, lng;

  if (!event.body) {
    // Works in the AWS test environment
    lat = event.lat;
    lng = event.lng;
  } else {
    // Works for frontend
    const body = JSON.parse(event.body);
    lat = body.lat;
    lng = body.lng;
  }

  // Error if lat, lng is not passed in
  if (!lat || !lng) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Latitude and longitude are required",
        eventBody: event.body,
      }),
    };
  }

  try {
    // Fetch the API and store the JSON
    const response = await fetch(
      `https://api.sunrisesunset.io/json?lat=${lat}&lng=${lng}&date_start=today&date_end=tomorrow&time_format=24`
    );
    const json = await response.json();

    // Prepare the response data
    const todayResults = json.results[0];
    const tomorrowResults = json.results[1];

    // Convert today and tomorrow sunrise and sunset times to ISO format
    const todaySunrise = new Date(
      `${todayResults.date}T${todayResults.sunrise}Z`
    ).toISOString();
    const todaySunset = new Date(
      `${todayResults.date}T${todayResults.sunset}Z`
    ).toISOString();
    const tomorrowSunrise = new Date(
      `${tomorrowResults.date}T${tomorrowResults.sunrise}Z`
    ).toISOString();

    // Put in data into payload variable
    const payload = {
      todaySunrise: todaySunrise,
      todaySunset: todaySunset,
      tomorrowSunrise: tomorrowSunrise,
    };

    return {
      body: JSON.stringify(payload),
    };
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching data:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "An error occurred while fetching data" }),
    };
  }
};
