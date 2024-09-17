// import * as React from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

function HomeScreen() {
  return (
    <View style={styles.container}>
    <Text style={styles.white}>SolSync</Text>
  </View>
  );
}

function LoginScreen() {
  return (
    <View style={styles.container}>
    <Text style={styles.white}>Login</Text>
  </View>
  );
}

function HabitsScreen() {
  return (
    <View style={styles.container}>
    <Text style={styles.white}>Habits</Text>
  </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
      {/* <View style={styles.container}>
        <Text style={styles.white}>SolSync</Text>
        <StatusBar style="auto" />
      </View> */}
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Login" component={LoginScreen} />
          <Tab.Screen name="Habits" component={HabitsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CC9ED0",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -380,
  },
  white: {
    color: "white",
    fontWeight: "bold",
    fontSize: 50,
  },
});
