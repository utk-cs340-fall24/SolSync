"location ";

import { SolSyncUser } from "@/types";
import { Location } from "@/types";
import getLocationFromDevice from "@/utils/getLocationFromDevice";

type SunriseSunsetResponse = {
  isLocationPermissionGranted: boolean;
  sunrise: Date | null;
  sunset: Date | null;
  nextSunrise: Date | null;
};

export async function getSunriseSunsetTime(
  user: SolSyncUser | null,
): Promise<SunriseSunsetResponse> {
  let location: Location;

  if (user) {
    location = user.location;
  } else {
    location = await getLocationFromDevice();
  }

  if (!location.latitude || !location.longitude) {
    return {
      isLocationPermissionGranted: false,
      sunrise: null,
      sunset: null,
      nextSunrise: null,
    };
  }

  const apiUrl = process.env.EXPO_PUBLIC_GETSUNRISESUNSET_API_URL;

  if (!apiUrl) {
    throw new Error(
      "GETSUNRISESUNSET_API_URL is not defined in the environment variables.",
    );
  }

  const url = new URL(apiUrl);

  url.searchParams.append("latitude", location.latitude.toString());
  url.searchParams.append("longitude", location.longitude.toString());

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-api-key": process.env.EXPO_PUBLIC_GETSUNRISESUNSET_API_KEY as string,
      },
    });

    const jsonData = await response.json();

    if (jsonData.message) {
      return {
        isLocationPermissionGranted: true,
        sunrise: null,
        sunset: null,
        nextSunrise: null,
      };
    } else {
      return {
        isLocationPermissionGranted: true,
        sunrise: new Date(jsonData.todaySunrise),
        sunset: new Date(jsonData.todaySunset),
        nextSunrise: new Date(jsonData.tomorrowSunrise),
      };
    }
  } catch (error) {
    console.error(error);
    return {
      isLocationPermissionGranted: true,
      sunrise: null,
      sunset: null,
      nextSunrise: null,
    };
  }
}
