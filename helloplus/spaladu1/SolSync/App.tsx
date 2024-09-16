import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.white}>SolSync</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CC9ED0',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -380,
  },
  white: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 50,
  },
});
