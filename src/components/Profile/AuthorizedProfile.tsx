import { signOut, User } from "firebase/auth";
import { useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { default as FeatherIcon } from "react-native-vector-icons/Feather";
import { default as FAIcon } from "react-native-vector-icons/FontAwesome";

import useUser from "@/hooks/useUser";
import { upsertUser } from "@/server";
import getLocationFromDevice from "@/utils/getLocationFromDevice";

import { firebaseAuth } from "../../../firebaseConfig";

export default function AuthorizedProfile() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const userObject = useUser();

  const handleUpdateLocation = async () => {
    if (!userObject.user) {
      return;
    }

    const location = await getLocationFromDevice();

    userObject.user.location.latitude = location.latitude;
    userObject.user.location.longitude = location.longitude;
    upsertUser(userObject.user as User, location, userObject.user.displayName);
    userObject.reloadUser();
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setIsModalVisible(!isModalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Edit Name and Email here</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setIsModalVisible(!isModalVisible)}
          >
            <Text style={styles.textStyle}>Save</Text>
          </Pressable>
        </View>
      </Modal>

      <TouchableOpacity style={styles.editButton}>
        <FeatherIcon
          name="edit"
          size={38}
          color="#5A5A5A"
          onPress={() => setIsModalVisible(true)}
        ></FeatherIcon>
      </TouchableOpacity>

      <Text style={styles.header}>Hello, {userObject.user?.displayName}!</Text>

      <FAIcon
        name="user-circle"
        size={100}
        color="gray"
        style={{ marginBottom: 40 }}
      ></FAIcon>

      <View style={styles.infoBox}>
        <View style={styles.infoField}>
          <Text style={styles.infoTitle}>Name: </Text>
          <Text style={styles.infoValue}>{userObject.user?.displayName}</Text>
        </View>
        <View style={styles.line}></View>
        <View style={styles.infoField}>
          <Text style={styles.infoTitle}>Email: </Text>
          <Text style={styles.infoValue}>{userObject.user?.email}</Text>
        </View>
      </View>

      <View style={styles.infoBox}>
        <View style={styles.infoField}>
          <Text style={styles.infoTitle}>Latitude: </Text>
          <Text style={styles.infoValue}>
            {userObject.user?.location?.latitude?.toPrecision(7)}
          </Text>
        </View>
        <View style={styles.line}></View>
        <View style={styles.infoField}>
          <Text style={styles.infoTitle}>Longitude: </Text>
          <Text style={styles.infoValue}>
            {userObject.user?.location?.longitude?.toPrecision(7)}
          </Text>
        </View>
      </View>

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
    top: "5%",
    right: "8%",
  },
  header: {
    fontSize: 30,
    paddingBottom: 40,
    marginTop: 50,
    width: "80%",
    textAlign: "center",
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
  locationButton: {
    backgroundColor: "#b38acb", // Light purple color
    width: "95%",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  logOutButton: {
    backgroundColor: "#f4a58a", // Light orange color
    width: "95%",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  // modal stuff starting here
  modalView: {
    flex: 1,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    // padding: 100,
    width: "92%",
    height: "92%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
