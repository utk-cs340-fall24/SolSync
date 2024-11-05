import { zodResolver } from "@hookform/resolvers/zod";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
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
import { z } from "zod";

import useUser from "@/hooks/useUser";
import { upsertUser } from "@/server";

import { ProfileStackParamList } from ".";

const editProfileFormSchema = z.object({
  displayName: z.string().min(1, { message: "Name is required" }),
});

type EditProfileFormValues = z.infer<typeof editProfileFormSchema>;

type EditProfileScreenProps = NativeStackScreenProps<
  ProfileStackParamList,
  "EditProfile"
>;

const emojis = [
  "😀",
  "😂",
  "😘",
  "🤔",
  "😎",
  "🤯",
  "🥳",
  "😴",
  "🤠",
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
  "#D3D3D3", // Light Pastel Mint
];

type EmojiPickerProps = {
  selectedEmoji: string;
  onSelect: (emoji: string) => void;
};

const EmojiPicker: React.FC<EmojiPickerProps> = ({
  selectedEmoji,
  onSelect,
}) => {
  return (
    <FlatList
      data={emojis}
      keyExtractor={(item) => item}
      numColumns={5}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => onSelect(item)}
          style={[
            styles.emojiItem,
            item === selectedEmoji && styles.selectedEmojiItem, // Apply border if selected
          ]}
        >
          <Text style={styles.emojiText}>{item}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

type ColorPickerProps = {
  selectedColor: string;
  onSelectColor: (color: string) => void;
};

const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedColor,
  onSelectColor,
}) => {
  return (
    <FlatList
      data={colors}
      keyExtractor={(item) => item}
      numColumns={5}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => onSelectColor(item)}
          style={[
            styles.colorItem,
            { backgroundColor: item },
            item === selectedColor && styles.selectedColorItem,
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
    },
  });

  const [selectedEmoji, setSelectedEmoji] = useState<string>("🙂");

  const handleEmojiSelect = (emoji: string): void => {
    setSelectedEmoji(emoji);
  };

  const [selectedColor, setSelectedColor] = useState<string>("#FF5733"); // Default color
  const handleColorSelect = (color: string): void => {
    setSelectedColor(color);
  };

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
    const { displayName } = data;

    await upsertUser(user, user.email, user.location, displayName, user.avatar); // TODO: new avatar here instead of user.avatar
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

        {/* Emoji Icon Picker */}
        <Text style={styles.fieldTitle}>Profile Icon</Text>

        <View style={styles.avatarContainer}>
          <EmojiPicker
            selectedEmoji={selectedEmoji}
            onSelect={handleEmojiSelect}
          />
          <View style={styles.line} />
          <ColorPicker
            selectedColor={selectedColor}
            onSelectColor={handleColorSelect}
          />
        </View>

        {/* Save and Cancel Buttons */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.navigate("AuthorizedProfile")}
        >
          <Text style={styles.buttonText}>Cancel</Text>
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
    // justifyContent: "center",
    padding: "2%",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4a3f4c",
    paddingTop: "10%",
    paddingBottom: "10%",
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
    marginBottom: "5%",
    paddingLeft: "5%",
  },
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
  },
  cancelButton: {
    backgroundColor: "#f4a58a", // Light orange color
    width: "90%",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
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
    borderColor: "black",
  },
  emojiText: { fontSize: 30 },
  line: {
    height: 1,
    backgroundColor: "#ccc",
  },
  // Color Picker
  colorItem: {
    width: 40, // Set fixed width for color item
    height: 40, // Set fixed height for color item
    borderRadius: 20, // Make the item round
    margin: 10, // Add margin to separate items slightly
  },
  selectedColorItem: {
    borderWidth: 2,
    borderColor: "black", // Black border around selected color
  },
});
