import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';

const workoutData = [
  { id: '1', title: "Chest Workout", duration: "75 minutes", time: "Tomorrow", imageUri: require('../assets/Images/fit1.jpg') },
  { id: '2', title: "Leg Workout", duration: "65 minutes", time: "Wednesday", imageUri: require('../assets/Images/fit2.jpg') },
  { id: '3', title: "Cardio Training", duration: "30 minutes", time: "Friday", imageUri: require('../assets/Images/fit3.jpg') },
  { id: '4', title: "Yoga Session", duration: "45 minutes", time: "Saturday", imageUri: require('../assets/Images/fit4.jpg') },
];

const todaysWorkout = [
  { id: '1', title: "Full Workout", duration: '90 minutes', time: "Today", imageUri: require('../assets/Images/fit5.jpg') }
];



const planData = [
  { id: '1', title: "Cardio Training", duration: "55 minutes", description: "10 Mile Run", imageUri: require('../assets/Images/fit5.jpg') },
  { id: '2', title: "Upper Body", duration: "45 minutes", description: "Target Chest", imageUri: require('../assets/Images/fit3.jpg') },
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
      <MaterialIcons name="chevron-right" size={30} color="#0690ffff" style={styles.iconStyle} />
    </TouchableOpacity>
  );

  const renderTodaysWorkout = ({ item }) => (
    <TouchableOpacity style={styles.todayContainer}>
      <View style={styles.todayInfo}>
        <Image source={item.imageUri} style={styles.todayImage} />
        <Text style={styles.todayTitle}>{item.title}</Text>
        <Text style={styles.todayDetails}>{item.duration} - {item.time}</Text>
      </View>
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

  const CalendarBar = () => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const todayIndex = new Date().getDay();
    const todayDate = new Date();
  
    return (
      <View style={styles.calendarContainer}>
        {daysOfWeek.map((day, index) => {
          const date = new Date();
          date.setDate(todayDate.getDate() - todayIndex + index); // Adjust date to match the day
  
          return (
            <View
              key={index}
              style={[
                styles.dayBox,
                index === todayIndex && styles.currentDayBox, // Highlight today's box
              ]}
            >
              <Text style={[styles.dayText, index === todayIndex && styles.currentDayText]}>
                {day}
              </Text>
              <Text style={[styles.dateText, index === todayIndex && styles.currentDateText]}>
                {date.getDate()}
              </Text>
            </View>
          );
        })}
      </View>
    );
  };
  

  return (
    <FlatList
      data={[]} 
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={
        <View style={styles.headerContainer}>

          <CalendarBar/>

          <Text style={styles.firstTitle}>Today</Text>
          <FlatList 
            data={todaysWorkout.slice(0, visibleWorkouts)}
            renderItem={renderTodaysWorkout}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingBottom: 20 }}
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
    backgroundColor: '#f8f9fc', 
  },
  headerContainer: {
    backgroundColor: '#f8f9fc', 
  },
  footerContainer: {
    backgroundColor: '#f8f9fc', 
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 15,
    marginTop: 20,
    color: '#2C2D2F',
    textAlign: 'center',
  },
  workoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    margin: 10,
    backgroundColor: '#2585F820',
    borderRadius: 10,
  },
  workoutImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutTitle: {
    fontSize: 18,
    color: '#2C2D2F',
    fontWeight: 'bold',
  },
  workoutDetails: {
    color: '#2C2D2F',
    fontSize: 14,
  },
  firstTitle: {
    marginTop: 10,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  todayContainer: {
    alignItems: 'center',
    padding: 20,
    margin: 10,
    backgroundColor: '#0690ffff',
    borderRadius: 10,
  },
  todayInfo: {
    flex: 1,
  },
  todayImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  todayTitle: {
    fontSize: 18,
    color: '#f8f9fc',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  todayDetails: {
    color: '#f8f9fc',
    fontSize: 14,
    textAlign: 'center',
  },
  iconStyle: {
    marginLeft: 10,
  },
  loadMoreButton: {
    alignSelf: 'center',
    padding: 10,
    borderRadius: 15,
    marginVertical: 10,
    width: '90%',
    backgroundColor: '#0690ffff',
  },
  loadMoreText: {
    fontSize: 16,
    color: '#f8f9fc',
    textAlign: 'center',
  },
  planContainer: {
    backgroundColor: '#2C2D2F',
    padding: 20,
    margin: 10,
    borderRadius: 15,
    width: 200,
    alignItems: 'center',
    position: 'relative',  // Allow absolute positioning for the duration icon
  },
  planImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 20, // Add margin bottom to give space for the icon
  },
  planDuration: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#0690ffff',
    color: '#f8f9fc',
    padding: 5,
    borderRadius: 10,
    zIndex: 10, // Ensure the icon is above the image
  },
  planTitle: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    color: '#f8f9fc',
  },
  planDescription: {
    fontSize: 14,
    color: '#f8f9fc',
    textAlign: 'center',
    marginVertical: 5,
  },
  startButton: {
    backgroundColor: '#0690ffff',
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
    backgroundColor: '#0690ffff',
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
    padding: 15,
    marginTop: 10,
  },
  viewAllText: {
    color: '#0690ffff',
    fontSize: 16,
  },
  calendarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderRadius: 40,
    padding: 5,
  },
  dayBox: {
    width: 40,
    height: 60,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#2585F830',
  },
  currentDayBox: {
    backgroundColor: '#2585F8', // Highlight for today
  },
  dayText: {
    fontSize: 16,
    color: '#2C2D2F',
    marginTop: 6,
  },
  dateText: {
    color: '#2C2D2F',
    fontSize: 20,

  },
  currentDateText: {
    color: '#e6f2ff',
    fontWeight: 'bold',
  },
  currentDayText: {
    color: '#e6f2ff',
    fontWeight: 'bold',
  },  
});
