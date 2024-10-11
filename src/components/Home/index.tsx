import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import sun from "@assets/sun.png";
import cloud from "@assets/simple_cloud.png";

const Hour = new Date().getHours();
const isDay = Hour >= 0 && Hour < 13;

let gradientColors = ["#FFFFFF"];
let colorsLocations = [0];

if (isDay) {
  gradientColors = ["#81A8F4", "#A4B3D6", "#E1C7A3", "#FFD18A"];
  colorsLocations = [0.03, 0.21, 0.65, 0.97];
} else {
  gradientColors = ["#FFD18A", "#FDC28D", "#FAB38F", "#F6A494"];
  colorsLocations = [0.2, 0.4, 0.7, 0.9];
}

export default function Home() {
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://u7t0yd53l2.execute-api.us-east-2.amazonaws.com/default/getSunriseTime",
        {
          method: "POST",
          headers: {
            "x-api-key": process.env.EXPO_PUBLIC_SUNRISE_TIME_API_KEY as string,
          },
          body: JSON.stringify({
            lat: "38.907192",
            lng: "-77.036873",
          }),
        },
      );
      const jsonData = await response.json();
      console.log(jsonData);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <LinearGradient
      colors={gradientColors}
      locations={colorsLocations}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.Hello}>Hello Amy!</Text>
        <Image style={styles.sun} source={sun} />
        <Image style={styles.cloud} source={cloud} />
        <Text style={styles.Sunrise1}>Sunrise: </Text>
        <Text style={styles.Sunset}>Sunset: 07:21 PM</Text>
        <Text style={styles.Sunrise2}>Next Sunrise: 07:31 AM</Text>
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
  },
  sun: {
    width: 100,
    height: 100,
    marginTop: 30,
    marginBottom: -115,
  },
  cloud: {
    width: 180,
    height: 180,
    marginTop: 2,
    marginBottom: 10,
  },
  Hello: {
    color: "white",
    fontWeight: "bold",
    fontSize: 45,
    paddingTop: -50,
    paddingBottom: 10,
  },
  Sunrise1: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
    paddingTop: 80,
  },
  Sunset: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
  },
  Sunrise2: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
    paddingBottom: 100,
  },
});
