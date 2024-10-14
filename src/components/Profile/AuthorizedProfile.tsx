import { signOut } from "firebase/auth";
import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
  Pressable,
} from "react-native";
import { default as FAIcon } from "react-native-vector-icons/FontAwesome";
import { firebaseAuth } from "../../../firebaseConfig";
import getLocationFromDevice from "@/utils/getLocationFromDevice";
import { LinearGradient } from "expo-linear-gradient";
import { default as FeatherIcon } from "react-native-vector-icons/Feather";
import useUser from "@/hooks/useUser";

const gradientColors = ["#FFD18A", "#C6B9E4", "#81A8F4"];
const colorsLocations = [0.15, 0.65, 1];

export default function AuthorizedProfile() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <LinearGradient
      colors={gradientColors}
      locations={colorsLocations}
      style={styles.container}
    >
      <View style={styles.content}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.content}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Edit Name and Email here</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Save</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <TouchableOpacity style={styles.editButton}>
          <FeatherIcon
            name="edit"
            size={38}
            color="white"
            onPress={() => setModalVisible(true)}
          ></FeatherIcon>
        </TouchableOpacity>

        <Text style={styles.header}>Hello, Amy!</Text>

        <FAIcon
          name="user-circle"
          size={100}
          color="black"
          style={{ marginBottom: 60 }}
        ></FAIcon>

        <View style={styles.option}>
          <Text style={{ width: 70 }}>Name: </Text>
          <Text>Amy</Text>
        </View>
        <View style={styles.line}></View>
        <View style={styles.option}>
          <Text style={{ width: 70 }}>Email: </Text>
          <Text>{useUser()?.email}</Text>
        </View>

        <TouchableOpacity
          style={styles.locationButton}
          onPress={() => getLocationFromDevice()}
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
  },
  editButton: {
    position: "absolute",
    top: "5%",
    right: "8%",
  },
  header: {
    fontSize: 30,
    paddingBottom: 60,
  },
  option: {
    margin: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
    width: "80%",
  },
  line: {
    height: 1,
    width: "80%",
    backgroundColor: "#918E8E",
    marginVertical: 14,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 12,
  },
  locationButton: {
    backgroundColor: "#908BE8",
    width: "64%",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 60,
    flexDirection: "row",
    justifyContent: "center",
  },
  logOutButton: {
    backgroundColor: "#908BE8",
    width: "64%",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "center",
  },
  // modal stuff starting here
  modalView: {
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
