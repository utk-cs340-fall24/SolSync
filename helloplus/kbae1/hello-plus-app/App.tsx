import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  const [todaySunrise, setTodaySunrise] = useState("");
  const [todaySunset, setTodaySunset] = useState("");
  const [tomorrowSunrise, setTomorrowSunrise] = useState("");
  const [tomorrowSunset, setTomorrowSunset] = useState("");

  useEffect(() => {
    // Get the sunset and sunrise times
    const fetchSunriseSunsetData = async () => {
      try {
        // Fetch for today using https://sunrisesunset.io/api/ using Knoxville's lat long
        const todayResponse = await fetch(
          "https://api.sunrisesunset.io/json?lat=38.907192&lng=-77.036873"
        );
        const todayData = await todayResponse.json();

        // Successfully hit the api
        if (todayData.status === "OK") {
          setTodaySunrise(todayData.results.sunrise);
          setTodaySunset(todayData.results.sunset);
        } else {
          console.log("Error fetching today's data:", todayData.status);
        }

        // Fetch for tomorrow
        const tomorrowResponse = await fetch(
          // Fetch for today using https://sunrisesunset.io/api/ using Knoxville's lat long for tomorrow
          "https://api.sunrisesunset.io/json?lat=38.907192&lng=-77.036873&date=tomorrow"
        );
        const tomorrowData = await tomorrowResponse.json();

        // Successfully hit the api for tomorrow
        if (tomorrowData.status === "OK") {
          setTomorrowSunrise(tomorrowData.results.sunrise);
          setTomorrowSunset(tomorrowData.results.sunset);
        } else {
          console.log("Error fetching tomorrow's data:", tomorrowData.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSunriseSunsetData();
  }, []);
  return (
    <>
      {/* Print out the welcome */}
      <View style={styles.container}>
        <Text>Welcome to SolSync!</Text>
        <StatusBar style="auto" />
      </View>

      {/* Print out the dates and times or N/A if there is an error*/}
      <View style={styles.container}>
        <Text style={styles.text}>
          Sunrise (Today): {todaySunrise || "N/A"}
        </Text>
        <Text style={styles.text}>Sunset (Today): {todaySunset || "N/A"}</Text>
        <Text style={styles.text}>
          Sunrise (Tomorrow): {tomorrowSunrise || "N/A"}
        </Text>
        <Text style={styles.text}>
          Sunset (Tomorrow): {tomorrowSunset || "N/A"}
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
  },
});
