import { StatusBar } from 'expo-status-bar';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to SolSync! This is Amy's Hello Plus.{"\n"}</Text>
      <Button 
        title="Log In"
        color="orange"
        onPress={() => Alert.alert("Log In Page under construction... come back later!")}
      />
      <StatusBar style="auto" />
    </View>
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
    marginBottom: "5%", 
  }, 
  
});
