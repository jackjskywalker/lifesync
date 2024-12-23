// FitnessScreen.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';

const workoutData = [
  { id: '1', title: "Chest Workout", duration: "75 minutes", time: "Tomorrow", imageUri: require('../assets/Images/fit1.jpg') },
  { id: '2', title: "Leg Workout", duration: "65 minutes", time: "Wednesday", imageUri: require('../assets/Images/fit2.jpg') },
  { id: '3', title: "Cardio Training", duration: "30 minutes", time: "Friday", imageUri: require('../assets/Images/fit3.jpg') },
  { id: '4', title: "Yoga Session", duration: "45 minutes", time: "Saturday", imageUri: require('../assets/Images/fit4.jpg') },
  // Add more workouts as needed
];

const planData = [
  { id: '1', title: "Cardio Training", duration: "55 minutes", description: "10 Mile Run", imageUri: require('../assets/Images/fit5.jpg') },
  { id: '2', title: "Upper Body", duration: "45 minutes", description: "Target Chest", imageUri: require('../assets/Images/fit3.jpg') },
  // Add more plans as needed
];

export default function FitnessScreen({ navigation }) {
  const [visibleWorkouts, setVisibleWorkouts] = useState(3);

  const renderWorkoutItem = ({ item }) => (
    <TouchableOpacity style={styles.workoutContainer}>
      <Image source={item.imageUri} style={styles.workoutImage} />
      <View style={styles.workoutInfo}>
        <Text style={styles.workoutTitle}>{item.title}</Text>
        <Text style={styles.workoutDetails}>{item.duration} - {item.time}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={30} color="#000" />
    </TouchableOpacity>
  );

  const renderPlanItem = ({ item }) => (
    <View style={styles.planContainer}>
      <Text style={styles.planDuration}>{item.duration}</Text>
      <Image source={item.imageUri} style={styles.planImage} />
      <Text style={styles.planTitle}>{item.title}</Text>
      <Text style={styles.planDescription}>{item.description}</Text>
      <TouchableOpacity style={styles.startButton}>
        <Text style={styles.startButtonText}>Start Now</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={[]} 
      keyExtractor={(item, index) => index.toString()} 
      ListHeaderComponent={
        <View style={styles.headerContainer}>
          <Image 
            source={require('../assets/Images/landing.jpg')}  
            style={styles.headerImage}
          />
          <Text style={styles.title}>Upcoming Workouts</Text>

          <FlatList 
            data={workoutData.slice(0, visibleWorkouts)}
            renderItem={renderWorkoutItem}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
          {visibleWorkouts < workoutData.length ? (
            <TouchableOpacity style={styles.loadMoreButton} onPress={() => setVisibleWorkouts(workoutData.length)}>
              <Text style={styles.loadMoreText}>Load More</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.loadMoreButton} onPress={() => setVisibleWorkouts(3)}>
              <Text style={styles.loadMoreText}>Show Less</Text>
            </TouchableOpacity>
          )}

          <View style={styles.currentPlanHeader}>
            <Text style={styles.title}>Current Plan</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AllPlans')}>
              <Text style={styles.viewAllText}>View All Plans</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
      ListFooterComponent={
        <View style={styles.footerContainer}>
          <FlatList
            horizontal
            data={planData}
            renderItem={renderPlanItem}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
          />
          <View style={styles.modifyContainer}>
            <Text style={styles.modifyText}>Modify Workout Plan</Text>
            <Text style={styles.descriptionText}>You have a new schedule change? Need to update your fitness goal? Time to update your workout plan.</Text>
            <TouchableOpacity style={styles.updateButton}>
              <Text style={styles.updateButtonText}>Update Preferences</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
      style={styles.container} 
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
  },
  headerContainer: {
    backgroundColor: '#fff', 
  },
  footerContainer: {
    backgroundColor: '#fff', 
  },
  headerImage: {
    width: '100%',
    height: 200,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 15,
    marginTop: 20,
  },
  workoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
    margin: 10,
    borderRadius: 8,
  },
  workoutImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 8,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutTitle: {
    fontSize: 18,
  },
  workoutDetails: {
    color: '#555',
    fontSize: 14,
  },
  loadMoreButton: {
    alignSelf: 'center',
    padding: 10,
    borderRadius: 20,
    borderColor: '#ddd',
    borderWidth: 1,
    marginVertical: 10,
    width: '90%',
    backgroundColor: '#4285F4',
  },
  loadMoreText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  planContainer: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    margin: 10,
    borderRadius: 8,
    width: 200,
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
  startButton: {
    backgroundColor: '#4285F4',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  startButtonText: {
    color: 'white',
    fontSize: 16,
  },
  modifyContainer: {
    backgroundColor: '#e6f2ff',
    padding: 15,
    margin: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  modifyText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  updateButton: {
    backgroundColor: '#4285F4',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  updateButtonText: {
    color: 'white',
    fontSize: 16,
  },
  currentPlanHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  viewAllText: {
    color: '#4285F4',
    fontSize: 16,
  },
});