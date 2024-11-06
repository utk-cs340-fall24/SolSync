import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ActivityIndicator } from "react-native";
import { default as FeatherIcon } from "react-native-vector-icons/Feather";
import { default as FAIcon } from "react-native-vector-icons/FontAwesome";

import useUser from "@/hooks/useUser";
import { upsertUser } from "@/server";
import { sendDataEmail } from "@/server/emails";
import getLocationFromDevice from "@/utils/getLocationFromDevice";

import { firebaseAuth } from "../../../firebaseConfig";
import { ProfileStackParamList } from ".";

type AuthorizedProfilePageProps = NativeStackScreenProps<
  ProfileStackParamList,
  "AuthorizedProfile"
>;

export default function AuthorizedProfile({
  navigation,
}: AuthorizedProfilePageProps) {
  const { user, userIsLoading, reloadUser } = useUser();
  const [requestDataLoading, setRequestDataLoading] = useState(false);

  if (userIsLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color="#000000" />
      </View>
    );
  }

  if (!user) {
    return <Text>Please log in to view your profile</Text>;
  }

  const handleUpdateLocation = async () => {
    const location = await getLocationFromDevice();

    const userCopy = user;

    userCopy.location.latitude = location.latitude;
    userCopy.location.longitude = location.longitude;

    await upsertUser(
      userCopy,
      userCopy.email,
      location,
      userCopy.displayName,
      userCopy.avatar,
    );
    await reloadUser();
  };

  const requestDataEmail = async () => {
    setRequestDataLoading(true);

    await sendDataEmail(user.id);

    setRequestDataLoading(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.editButton}>
        <FeatherIcon
          name="edit"
          size={38}
          color="#5A5A5A"
          onPress={() => navigation.navigate("EditProfile")}
        ></FeatherIcon>
      </TouchableOpacity>

      <Text style={styles.header}>Hello, {user?.displayName}!</Text>

      <FAIcon
        name="user-circle"
        size={100}
        color="gray"
        style={{ marginBottom: 40 }}
      ></FAIcon>

      <View style={styles.infoBox}>
        <View style={styles.infoField}>
          <Text style={styles.infoTitle}>Name </Text>
          <Text style={styles.infoValue}>{user?.displayName}</Text>
        </View>
        <View style={styles.line}></View>
        <View style={styles.infoField}>
          <Text style={styles.infoTitle}>Email </Text>
          <Text style={styles.infoValue}>{user?.email}</Text>
        </View>
      </View>

      <View style={styles.infoBox}>
        <View style={styles.infoField}>
          <Text style={styles.infoTitle}>Latitude </Text>
          <Text style={styles.infoValue}>
            {user?.location?.latitude?.toPrecision(7)}
          </Text>
        </View>
        <View style={styles.line}></View>
        <View style={styles.infoField}>
          <Text style={styles.infoTitle}>Longitude </Text>
          <Text style={styles.infoValue}>
            {user?.location?.longitude?.toPrecision(7)}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.requestDateButton}
        onPress={requestDataEmail}
      >
        {requestDataLoading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <FAIcon
            name="table"
            size={25}
            color="white"
            style={{ marginHorizontal: 6 }}
          ></FAIcon>
        )}
        <Text style={styles.buttonText}>Request your data</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.locationButton}
        onPress={handleUpdateLocation}
      >
        <FAIcon
          name="location-arrow"
          size={25}
          color="white"
          style={{ marginHorizontal: 6 }}
        ></FAIcon>
        <Text style={styles.buttonText}>Reset Your Location</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logOutButton}
        onPress={() => signOut(firebaseAuth)}
      >
        <FAIcon
          name="sign-out"
          size={25}
          color="white"
          style={{ marginHorizontal: 6 }}
        ></FAIcon>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  editButton: {
    position: "absolute",
    top: 36,
    right: 20,
  },
  header: {
    fontSize: 30,
    paddingBottom: 40,
    marginTop: 50,
    width: "80%",
    textAlign: "center",
    color: "#4a3f4c",
  },
  infoBox: {
    backgroundColor: "#fff",
    width: "95%",
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
  },
  infoField: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    width: "100%",
  },
  infoTitle: {
    width: 95,
    fontSize: 18,
    flexShrink: 1,
  },
  infoValue: {
    fontSize: 18,
    color: "#5A5A5A",
    textAlign: "right",
    flexShrink: 1,
    flexGrow: 1,
  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: "#F5F5F5",
    marginVertical: 14,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 12,
  },
  requestDateButton: {
    backgroundColor: "#b38acb", // Light purple color
    width: "95%",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  locationButton: {
    backgroundColor: "#b38acb", // Light purple color
    width: "95%",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  logOutButton: {
    backgroundColor: "#f4a58a", // Light orange color
    width: "95%",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
    flexDirection: "row",
    justifyContent: "center",
  },
});
