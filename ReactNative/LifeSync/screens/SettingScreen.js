import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

const settingsOptions = [
  'Account Profile', 'Calendar Integration', 'Fitness Preferences', 'Diet Preferences',
  'Notifications', 'Help Center', 'Privacy & Security', 'Terms & Conditions'
];

const placeholderImage = 'path_to_placeholder_image'; // Update with actual path or URL

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image source={{ uri: placeholderImage }} style={styles.profileImage} />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.username}>@johndoe</Text>
      </View>
      <FlatList 
        data={settingsOptions}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>{item}</Text>
            <Text style={styles.arrow}>{'>'}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
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
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  username: {
    fontSize: 14,
    color: '#555',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  optionText: {
    fontSize: 16,
  },
  arrow: {
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
  },
  logoutButton: {
    backgroundColor: 'blue',
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});