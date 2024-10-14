import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "@/screens/HomeScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import ProfileScreen from "@/screens/ProfileScreen";
import HabitsScreen from "@/screens/HabitsScreen";
import HabitProvider from "@/components/Habits/HabitProvider";
import HistoryScreen from "@/screens/HistoryScreen";

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
  );
}
