import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../Navigation';
import { MaterialIcons } from 'react-native-vector-icons';

const settingsOptions = [
  'Account Profile', 'Calendar Integration', 'Fitness Preferences', 'Diet Preferences',
  'Notifications', 'Help Center', 'Privacy & Security', 'Terms & Conditions'
];

export default function SettingsScreen({ navigation }) {
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      setIsAuthenticated(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to logout');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <View style={styles.profileImage}>
          <MaterialIcons name="person" size={50} color="gray" /> {/* Placeholder person icon */}
        </View>
        <MaterialIcons name="edit" size={24} color="#007bff" style={styles.editIcon} /> {/* Edit icon */}
        <Text style={styles.name}>Jack Skywalker</Text>
        <Text style={styles.username}>@jackskywalker</Text>
      </View>
      <FlatList
        data={settingsOptions}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>{item}</Text> {/* Ensure text is wrapped in <Text> */}
            {/* Wrap icon in a Text element explicitly */}
            <Text>
              <MaterialIcons name="chevron-right" size={24} color="gray" /> {/* Right arrow icon */}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text> {/* Ensure text is wrapped in <Text> */}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profile: {
    alignItems: 'center',
    marginTop: 20,
    paddingBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0e0e0', // Placeholder color
    alignItems: 'center',
    justifyContent: 'center',
  },
  editIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#fff', // Background for edit icon
    borderRadius: 12,
    padding: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  username: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10, // Added margin to increase spacing below the username
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  optionText: {
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
  },
  logoutButton: {
    backgroundColor: '#007bff', // Same blue as setting icon
    padding: 15,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
