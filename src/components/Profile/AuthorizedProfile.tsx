import { useState } from "react";
import { StyleSheet, View, Text, Button, Switch } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function AuthorizedProfile() {
  const [pushIsEnabled, setPushIsEnabled] = useState(false);
  const pushNotificationsSwitch = () => {
    setPushIsEnabled((previousState) => !previousState);
    if (!pushIsEnabled) {
      console.log("Push notifications are ON");
    } else {
      console.log("Push notifications are OFF");
    }
  };

  const [emailIsEnabled, setEmailIsEnabled] = useState(false);
  const emailNotificationsSwitch = () => {
    setEmailIsEnabled((previousState) => !previousState);
    if (!emailIsEnabled) {
      console.log("Email notifications are ON");
    } else {
      console.log("Email notifications are OFF");
    }
  };

  return (
    <View style={styles.page}>
      <Text style={styles.header}>Hello, Amy!</Text>
      <Icon
        name="user-circle"
        size={100}
        color="gray"
        style={{ marginBottom: 20 }}
      ></Icon>
      <View style={styles.option}>
        <Text>Name: </Text>
        <Text>Amy Huang</Text>
      </View>
      <View style={styles.option}>
        <Text>Email: </Text>
        <Text>filleremail@gmail.com</Text>
      </View>
      <View style={styles.option}>
        <Text>Push Notifications</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={pushIsEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={pushNotificationsSwitch}
          value={pushIsEnabled}
        />
      </View>
      <View style={[styles.option, { marginBottom: 20 }]}>
        <Text>Email Notifications</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={emailIsEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={emailNotificationsSwitch}
          value={emailIsEnabled}
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Reset Location"
          color="white"
          onPress={() => {
            console.log("Reset Location");
          }}
        ></Button>
      </View>
      <View style={styles.button}>
        <Button
          title="Log Out"
          color="white"
          onPress={() => {
            console.log("Log Out");
          }}
        ></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 30,
    paddingBottom: 20,
  },
  option: {
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    width: "80%",
  },
  button: {
    borderRadius: 10,
    backgroundColor: "purple",
    margin: 10,
    width: "40%",
  },
});
