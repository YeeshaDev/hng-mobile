import React from 'react';
import { 
  View, Text, TouchableOpacity, Linking, StyleSheet, StatusBar 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E1E1E" />
      <Text style={styles.title}>Mobile Task Git-ting Started</Text>
      <Text style={styles.subtitle}>Explore the Repository & HNG Hire Links</Text>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => Linking.openURL('https://github.com/yeeshadev/hng-mobile')}
      >
        <Ionicons name="logo-github" size={24} color="white" />
        <Text style={styles.buttonText}>GitHub Repository</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => Linking.openURL('https://hng.tech/hire/react-native-developers')}
      >
        <Ionicons name="briefcase-outline" size={24} color="white" />
        <Text style={styles.buttonText}>Hire HNG Developers</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign:'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#bbb',
    marginBottom: 30,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0CBEA7',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
    width: '90%',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
});
