import { zodResolver } from "@hookform/resolvers/zod";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { default as IonIcons } from "react-native-vector-icons/Ionicons";
import { z } from "zod";

import useUser from "@/hooks/useUser";
import { upsertUser } from "@/server";
import { Avatar } from "@/types";

import { ProfileStackParamList } from ".";

const editProfileFormSchema = z.object({
  displayName: z.string().min(1, { message: "Name is required" }),
  emoji: z.string().nullable(),
  background: z.string().nullable(),
});

type EditProfileFormValues = z.infer<typeof editProfileFormSchema>;

type EditProfileScreenProps = NativeStackScreenProps<
  ProfileStackParamList,
  "EditProfile"
>;

const emojis = [
  "😀",
  "😊",
  "😇",
  "😘",
  "😎",
  "🥳",
  "😴",
  "🤠",
  "🌻",
  "☀️",
  "🌙",
  "🌟",
  "🌈",
  "❤️",
  "🤖",
];

const colors = [
  "#FF677D", // Pastel Red
  "#FFDFBA", // Pastel Orange
  "#F8ECA0", // Darker Pastel Yellow
  "#BAFFC9", // Pastel Green
  "#BAE1FF", // Pastel Blue
  "#FFABAB", // Light Pastel Red
  "#FFC3A0", // Light Pastel Coral
  "#F7B7E6", // Pastel pink
  "#D3C5FF", // Light Pastel Purple
  "#D3D3D3", // Light Gray
];

type EmojiPickerProps = {
  value: string | null;
  onChange: (emoji: string) => void;
};

const EmojiPicker: React.FC<EmojiPickerProps> = ({ value, onChange }) => {
  return (
    <FlatList
      data={emojis}
      keyExtractor={(item) => item}
      numColumns={5}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => onChange(item)}
          style={[
            styles.emojiItem,
            item === value && styles.selectedEmojiItem, // Apply border if selected
          ]}
        >
          <Text style={styles.emojiText}>{item}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

type ColorPickerProps = {
  value: string | null;
  onChange: (color: string) => void;
};

const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange }) => {
  return (
    <FlatList
      data={colors}
      keyExtractor={(item) => item}
      numColumns={5}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => onChange(item)}
          style={[
            styles.colorItem,
            { backgroundColor: item },
            item === value && styles.selectedColorItem,
          ]}
        />
      )}
    />
  );
};

export default function EditProfile({ navigation }: EditProfileScreenProps) {
  const { user, userIsLoading, reloadUser } = useUser();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileFormValues>({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: {
      displayName: user?.displayName,
      emoji: user?.avatar.emoji,
      background: user?.avatar.background,
    },
  });

  if (userIsLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color="#000000" />
      </View>
    );
  }

  if (!user) {
    return;
  }

  const onSubmit: SubmitHandler<EditProfileFormValues> = async (data) => {
    const { displayName, emoji, background } = data;

    let newAvatar: Avatar;

    if (!emoji) {
      newAvatar = { emoji: null, background: null }; // NullAvatar
    } else {
      newAvatar = {
        emoji: emoji,
        background: background || colors[0], // ValidAvatar with fallback color
      };
    }

    await upsertUser(user, user.email, user.location, displayName, newAvatar);
    await reloadUser();

    navigation.navigate("AuthorizedProfile");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Edit Your Profile</Text>

        {/* Edit Name */}
        <Text style={styles.fieldTitle}>Name</Text>
        <Controller
          control={control}
          name="displayName"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              autoCorrect={false}
              autoCapitalize="words"
              style={styles.input}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />

        {errors.displayName && (
          <Text style={{ color: "red" }}>{errors.displayName.message}</Text>
        )}

        <TouchableOpacity
          style={styles.changePasswordButton}
          onPress={() => navigation.navigate("ChangePassword")}
        >
          <Text style={styles.buttonText}>Change Your Password</Text>
          <IonIcons
            name="arrow-forward"
            size={25}
            color="white"
            style={{ marginHorizontal: 6 }}
          />
        </TouchableOpacity>

        {/* Emoji Icon Picker */}
        <Text style={styles.fieldTitle}>Profile Icon</Text>
        <View style={styles.avatarContainer}>
          <Controller
            control={control}
            name="emoji"
            render={({ field: { onChange, value } }) => (
              <EmojiPicker value={value} onChange={onChange} />
            )}
          />
          <View style={styles.line} />
          <Controller
            control={control}
            name="background"
            render={({ field: { onChange, value } }) => (
              <ColorPicker value={value} onChange={onChange} />
            )}
          />
        </View>

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

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSubmit(onSubmit)}
        >
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
    backgroundColor: "#F5F5F5",
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
  fieldTitle: {
    paddingLeft: "7%",
    fontSize: 18,
    alignSelf: "flex-start",
    marginBottom: "3%",
    color: "#5A5A5A",
  },
  input: {
    width: "90%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingLeft: "5%",
    backgroundColor: "white",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  changePasswordButton: {
    backgroundColor: "#b38acb", // Light purple color
    width: "90%",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: "4%",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: "5%",
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
  // Emoji Picker
  avatarContainer: {
    width: "90%",
    justifyContent: "center",
    padding: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: "3%",
    backgroundColor: "white",
  },
  emojiItem: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  selectedEmojiItem: {
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "#4a3f4c",
  },
  emojiText: {
    fontSize: 30,
    marginLeft: 2,
  },
  line: {
    height: 1,
    backgroundColor: "#ccc",
  },
  // Color Picker
  colorItem: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 10,
  },
  selectedColorItem: {
    borderWidth: 2,
    borderColor: "#4a3f4c",
  },
});
