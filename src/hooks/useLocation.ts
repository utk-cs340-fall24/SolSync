import {
  getLastKnownPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import useUser from "./useUser";
import { useEffect, useState } from "react";

const useLocation = (): [
  { latitude: number; longitude: number } | undefined,
  string,
] => {
  const user = useUser();
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  }>();
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // return undefined if user is not logged in
    if (!user) {
      return;
    }

    const getLocation = async () => {
      try {
        // request permission for foreground location
        const { status } = await requestForegroundPermissionsAsync();

        // if permission is not granted, set an error and return
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        // if permission is granted, get the current location
        const location = await getLastKnownPositionAsync({});
        setLocation({
          latitude: location?.coords.latitude || 0,
          longitude: location?.coords.latitude || 0,
        });
      } catch (error) {
        if (error instanceof Error) {
          setErrorMsg(error.message);
        }
      }
    };

    getLocation();
  }, [user]);

  // return the location and error message
  return [location, errorMsg];
};

export default useLocation;
