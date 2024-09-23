import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "@/screens/HomeScreen";
import SettingsScreen from "@/screens/SettingsScreen";
import SignUpScreen from "@/screens/SignUpScreen";
import LoginScreen from "@/screens/LoginScreen";
import Ionicons from "@expo/vector-icons/Ionicons";

function getIconName(
  routeName: string,
  focused: boolean
): keyof typeof Ionicons.glyphMap {
  switch (routeName) {
    case "Home":
      return focused ? "home" : "home-outline";
    case "Settings":
      return focused ? "settings" : "settings-outline";
    default:
      return "caret-up";
  }
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = getIconName(route.name, focused);
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "purple",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
        <Tab.Screen name="Sign Up" component={SignUpScreen} />
        <Tab.Screen name="Login" component={LoginScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
