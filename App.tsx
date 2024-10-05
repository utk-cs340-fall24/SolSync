import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "@/screens/HomeScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import ProfileScreen from "@/screens/ProfileScreen";

const getIconName = (
  routeName: string,
  focused: boolean,
): keyof typeof Ionicons.glyphMap => {
  switch (routeName) {
    case "Home":
      return focused ? "home" : "home-outline";
    case "Profile":
      return focused ? "person-circle" : "person-circle-outline";
    default:
      return "caret-up";
  }
};

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
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
