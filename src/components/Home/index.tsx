import cloud from "@assets/simple_cloud.png";
import sun from "@assets/sun.png";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

import getLocationFromDevice from "@/utils/getLocationFromDevice";

import useUser from "../../hooks/useUser";

const Hour = new Date().getHours();
const isDay = Hour >= 0 && Hour < 12;

let gradientColors = ["#FFFFFF"];
let colorsLocations = [0];
let IntroMsg = "";

if (isDay) {
  gradientColors = ["#81A8F4", "#A4B3D6", "#E1C7A3", "#FFD18A"];
  colorsLocations = [0.03, 0.21, 0.65, 0.97];
} else {
  gradientColors = ["#FFD18A", "#FDC28D", "#FAB38F", "#F6A494"];
  colorsLocations = [0.2, 0.4, 0.7, 0.9];
}

if (Hour >= 3 && Hour < 12) {
  IntroMsg = "Good Morning";
} else if (Hour >= 12 && Hour < 18) {
  IntroMsg = "Good Afternoon";
} else {
  IntroMsg = "Good Evening";
}

export default function Home() {
  const [sunrise, setSunrise] = useState<Date | null>();
  const [sunset, setSunset] = useState<Date | null>();
  const [nextsunrise, setNextSunrise] = useState<Date | null>();
  const [loading, setLoading] = useState(true);
  const [user, userLoading] = useUser();

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    let location = user?.location;
    if (user) {
      location = user.location;
    } else {
      location = await getLocationFromDevice();
    }

    try {
      const response = await fetch(
        "https://u7t0yd53l2.execute-api.us-east-2.amazonaws.com/default/getSunriseTime",
        {
          method: "POST",
          headers: {
            "x-api-key": process.env.EXPO_PUBLIC_SUNRISE_TIME_API_KEY as string,
          },
          body: JSON.stringify({
            lat: location.latitude,
            lng: location.longitude,
          }),
        },
      );
      const jsonData = await response.json();
      if (jsonData.message) {
        setSunrise(null);
        setSunset(null);
        setNextSunrise(null);
      } else {
        setSunrise(new Date(jsonData.todaySunrise));
        setSunset(new Date(jsonData.todaySunset));
        setNextSunrise(new Date(jsonData.tomorrowSunrise));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <LinearGradient
      colors={gradientColors}
      locations={colorsLocations}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.Hello}>{IntroMsg}</Text>
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
        ) : nextsunrise ? (
          <>
            <Text style={styles.Sunrise2}>Tomorrow's Sunrise:</Text>
            <Text style={styles.Sunrise2Data}>
              {nextsunrise?.toLocaleTimeString()}
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.Sunrise2}>Tomorrow's Sunrise:</Text>
            <Text style={styles.Sunrise2Data}>Time Not Available</Text>
          </>
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
    fontSize: 50,
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
});
