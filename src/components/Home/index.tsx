import cloud from "@assets/simple_cloud.png";
import sun from "@assets/sun.png";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

import useUser from "@/hooks/useUser";
import { getSunriseSunsetTime } from "@/server/sunrise-sunset-time";

const hour = new Date().getHours();
const isDay = hour >= 0 && hour < 12;

let gradientColors: string[];
let colorsLocations: number[];

if (isDay) {
  gradientColors = ["#81A8F4", "#A4B3D6", "#E1C7A3", "#FFD18A"];
  colorsLocations = [0.03, 0.21, 0.65, 0.97];
} else {
  gradientColors = ["#FFD18A", "#FDC28D", "#FAB38F", "#F6A494"];
  colorsLocations = [0.2, 0.4, 0.7, 0.9];
}

let introMessage = "";

if (hour >= 3 && hour < 12) {
  introMessage = "Good Morning";
} else if (hour >= 12 && hour < 18) {
  introMessage = "Good Afternoon";
} else {
  introMessage = "Good Evening";
}

export default function Home() {
  const [sunrise, setSunrise] = useState<Date | null>(null);
  const [sunset, setSunset] = useState<Date | null>(null);
  const [nextSunrise, setNextSunrise] = useState<Date | null>(null);
  const [isLocationPermissionGranted, setIsLocationPermissionGranted] =
    useState<boolean>(true);
  const [loading, setLoading] = useState(true);
  const { user, userIsLoading } = useUser();

  useEffect(() => {
    const fetchSunriseSunsetTime = async () => {
      setLoading(true);

      if (userIsLoading) {
        return;
      }

      const response = await getSunriseSunsetTime(user);

      setIsLocationPermissionGranted(response.isLocationPermissionGranted);
      setSunrise(response.sunrise);
      setSunset(response.sunset);
      setNextSunrise(response.nextSunrise);
      setLoading(false);
    };

    fetchSunriseSunsetTime();
  }, [user, userIsLoading]);

  return (
    <LinearGradient
      colors={gradientColors}
      locations={colorsLocations}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.Hello}>{introMessage}</Text>
        <Image style={styles.sun} source={sun} />
        <Image style={styles.cloud} source={cloud} />
        {loading ? (
          <>
            <Text style={styles.Sunrise1}>Sunrise:</Text>
            <ActivityIndicator size="small" color="#FFFFFF" />
          </>
        ) : sunrise ? (
          <>
            <Text style={styles.Sunrise1}>Sunrise:</Text>
            <Text style={styles.Sunrise1Data}>
              {sunrise?.toLocaleTimeString()}
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.Sunrise1}>Sunrise:</Text>
            <Text style={styles.Sunrise1Data}>Time Not Available</Text>
          </>
        )}
        {loading ? (
          <>
            <Text style={styles.Sunset}>Sunset:</Text>
            <ActivityIndicator size="small" color="#FFFFFF" />
          </>
        ) : sunset ? (
          <>
            <Text style={styles.Sunset}>Sunset:</Text>
            <Text style={styles.SunsetData}>
              {sunset?.toLocaleTimeString()}
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.Sunset}>Sunset:</Text>
            <Text style={styles.SunsetData}>Time Not Available</Text>
          </>
        )}
        {loading ? (
          <>
            <Text style={styles.Sunrise2}>Tomorrow's Sunrise:</Text>
            <ActivityIndicator size="small" color="#FFFFFF" />
          </>
        ) : nextSunrise ? (
          <>
            <Text style={styles.Sunrise2}>Tomorrow's Sunrise:</Text>
            <Text style={styles.Sunrise2Data}>
              {nextSunrise?.toLocaleTimeString()}
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.Sunrise2}>Tomorrow's Sunrise:</Text>
            <Text style={styles.Sunrise2Data}>Time Not Available</Text>
          </>
        )}
        {!isLocationPermissionGranted && (
          <Text style={styles.PermissionMessage}>
            Please allow location permissions to view current location's sunrise
            and sunset times
          </Text>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  sun: {
    width: 100,
    height: 100,
    marginTop: 30,
    marginBottom: -116,
  },
  cloud: {
    width: 190,
    height: 180,
    marginTop: 4,
    marginBottom: 10,
  },
  Hello: {
    color: "white",
    fontWeight: "bold",
    fontSize: 45,
    marginTop: 40,
    marginBottom: 5,
  },
  Sunrise1: {
    color: "white",
    fontWeight: "bold",
    fontSize: 35,
    marginTop: 25,
    alignItems: "center",
  },
  Sunrise1Data: {
    color: "white",
    fontWeight: "bold",
    fontSize: 35,
    alignItems: "center",
    marginBottom: 15,
  },
  Sunset: {
    color: "white",
    fontWeight: "bold",
    fontSize: 35,
    alignItems: "center",
  },
  SunsetData: {
    color: "white",
    fontWeight: "bold",
    fontSize: 35,
    alignItems: "center",
    marginBottom: 15,
  },
  Sunrise2: {
    color: "white",
    fontWeight: "bold",
    fontSize: 35,
    alignItems: "center",
  },
  Sunrise2Data: {
    color: "white",
    fontWeight: "bold",
    fontSize: 35,
    alignItems: "center",
  },
  PermissionMessage: {
    marginTop: 15,
    marginBottom: -10,
    color: "white",
    fontWeight: "normal",
    fontSize: 18,
    alignItems: "center",
    flexShrink: 1,
    paddingHorizontal: 10,
    textAlign: "center",
  },
});
