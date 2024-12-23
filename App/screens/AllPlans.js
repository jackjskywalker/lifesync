// AllPlans.js

import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

const planData = [
  { id: '1', title: "Cardio Training", duration: "55 minutes", description: "10 Mile Run", imageUri: require('../assets/Images/fit5.jpg') },
  { id: '2', title: "Upper Body", duration: "45 minutes", description: "Target Chest", imageUri: require('../assets/Images/fit4.jpg') },
  // Add more plans as needed
];

export default function AllPlans() {
  const renderPlanItem = ({ item }) => (
    <View style={styles.planContainer}>
      <Text style={styles.planDuration}>{item.duration}</Text>
      <Image source={item.imageUri} style={styles.planImage} />
      <Text style={styles.planTitle}>{item.title}</Text>
      <Text style={styles.planDescription}>{item.description}</Text>
    </View>
  );

  return (
    <FlatList
      data={planData}
      renderItem={renderPlanItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
  },
  planContainer: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    margin: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  planImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  planDuration: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#4285F4',
    color: 'white',
    padding: 5,
    borderRadius: 10,
  },
  planTitle: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
  },
  planDescription: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginVertical: 5,
  },
});