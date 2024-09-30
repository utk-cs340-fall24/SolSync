import { StyleSheet, View, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import sun from "@assets/sun.png";
import cloud from "@assets/simple_cloud.png";

export default function Home() {
  return (
    <LinearGradient colors={["#B4CDD2", "#FFD18A"]} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.Hello}>Hello Amy!</Text>
        <Image style={styles.sun} source={sun} />
        <Image style={styles.cloud} source={cloud} />
        <Text style={styles.Sunrise1}>Sunrise: 07:31 AM</Text>
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
