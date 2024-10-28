import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import HabitProvider from "@/providers/HabitProvider";
import UserProvider from "@/providers/UserProvider";
import HabitsScreen from "@/screens/HabitsScreen";
import HistoryScreen from "@/screens/HistoryScreen";
import HomeScreen from "@/screens/HomeScreen";
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
    case "Habits":
      return focused ? "list" : "list-outline";
    default:
      return "caret-up";
  }
};

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <UserProvider>
      <HabitProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                const iconName = getIconName(route.name, focused);
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: "#908BE8",
              tabBarInactiveTintColor: "gray",
              headerShown: false,
            })}
          >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Habits" component={HabitsScreen} />
            <Tab.Screen name="History" component={HistoryScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </HabitProvider>
    </UserProvider>
  );
}
