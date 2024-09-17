import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, StyleSheet, Text, TextInput } from 'react-native';

function HomePage() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Welcome to SolSync! This is Amy's Hello Plus.{"\n"}</Text>
    </SafeAreaView>
  );
}

function ProfilePage() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Hello! Please sign in</Text>
      <TextInput 
        style={styles.input}
        placeholder='Username'
      />
      <TextInput
        style={styles.input}
        placeholder='Password'
        secureTextEntry
      />
      <Button 
        title="Log In"
        color="purple"
        onPress={() => ProfilePage}
      />
    </SafeAreaView>
  )
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name="Profile" component={ProfilePage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    marginBottom: 12, 
  }, 
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
