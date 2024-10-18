import {
  getLastKnownPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";

import { Location } from "@/types";

const getLocationFromDevice = async (): Promise<Location> => {
  const { status } = await requestForegroundPermissionsAsync();

  if (status !== "granted") {
    return {
      latitude: null,
      longitude: null,
    };
  }

  // if permission is granted, get the current location
  const location = await getLastKnownPositionAsync({});

  if (location?.coords.latitude && location?.coords.longitude) {
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  }

  return {
    latitude: null,
    longitude: null,
  };
};

export default getLocationFromDevice;
