import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { default as IonIcons } from "react-native-vector-icons/Ionicons";

import useUser from "@/hooks/useUser";
import { upsertUser } from "@/server";
import { Location, SolSyncUser } from "@/types";
import getLocationFromDevice from "@/utils/getLocationFromDevice";

import { ProfileStackParamList } from ".";

type ResetLocationScreenProps = NativeStackScreenProps<
  ProfileStackParamList,
  "ResetLocation"
>;

const getDefaultLocation = async (
  user: SolSyncUser | null,
): Promise<Location> => {
  try {
    const currentLoc = await getLocationFromDevice();

    if (currentLoc.latitude && currentLoc.longitude) {
      // Use device location if available
      return {
        latitude: currentLoc.latitude,
        longitude: currentLoc.longitude,
      };
    } else if (user?.location.latitude && user?.location.longitude) {
      // Else use user's stored location
      return user.location;
    }
  } catch (error) {
    console.log(error);
  }

  // Default to UTK coordinates if no location is available
  return {
    latitude: 35.9544,
    longitude: -83.9295,
  };
};

export default function ResetLocation({
  navigation,
}: ResetLocationScreenProps) {
  const { user, userIsLoading, reloadUser } = useUser();

  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the default location only once when component mounts
    const fetchLocation = async () => {
      const defaultlocation = await getDefaultLocation(user);
      setLocation(defaultlocation);
      setLoading(false);
    };

    fetchLocation();
  }, [user]);

  if (userIsLoading || loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color="#000000" />
      </View>
    );
  }

  if (!user) {
    return <Text>Please log in to edit your location</Text>;
  }

  const handleSubmit = async () => {
    if (location) {
      await upsertUser(
        user,
        user.email,
        location,
        user.displayName,
        user.avatar,
      );
      await reloadUser();
    }
    navigation.navigate("AuthorizedProfile");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Reset Your Location</Text>

        {/* MapView with onPress for selecting location */}
        {location && (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.latitude ?? 35.9544,
              longitude: location.longitude ?? -83.9295,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onPress={(e) => {
              const { latitude, longitude } = e.nativeEvent.coordinate;
              setLocation({ latitude, longitude });
            }}
          >
            {location.latitude !== null && location.longitude !== null && (
              <Marker coordinate={location} />
            )}
          </MapView>
        )}
        <Text style={styles.coordsText}>Latitude: {location?.latitude}</Text>
        <Text style={styles.coordsText}>Longitude: {location?.longitude}</Text>

        {/* Save and Cancel Buttons */}
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.navigate("AuthorizedProfile")}
        >
          <IonIcons
            name="close"
            size={25}
            color="white"
            style={{ marginHorizontal: 6 }}
          />
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
          <IonIcons
            name="checkmark-sharp"
            size={25}
            color="white"
            style={{ marginHorizontal: 6 }}
          />
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: "2%",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4a3f4c",
    paddingTop: "10%",
    paddingBottom: "5%",
  },
  input: {
    width: "90%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: "5%",
    paddingLeft: "5%",
  },
  map: {
    flex: 1,
    width: "100%",
  },
  coordsText: {
    color: "#4a3f4c",
  },
  // Buttons
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  saveButton: {
    backgroundColor: "#b38acb", // Light purple color
    width: "90%",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: "#f4a58a", // Light orange color
    width: "90%",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "center",
  },
});
