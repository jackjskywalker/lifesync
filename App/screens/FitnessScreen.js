
import React, { useState, useEffect } from 'react'; //ISAAC Added useEffect for random quote selection
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';

// ISAAC Inspirational Quotes array
const quotes = [
  "The best way to predict the future is to create it.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "Don't watch the clock; do what it does. Keep going.",
  "The harder you work for something, the greater you'll feel when you achieve it.",
  "Believe you can and you're halfway there.",
  "Success usually comes to those who are too busy to be looking for it.",
];

const workoutData = [
  { id: '1', title: "Chest Workout", duration: "75 minutes", time: "Tomorrow", imageUri: require('../assets/Images/fit1.jpg') },
  { id: '2', title: "Leg Workout", duration: "65 minutes", time: "Wednesday", imageUri: require('../assets/Images/fit2.jpg') },
  { id: '3', title: "Cardio Training", duration: "30 minutes", time: "Friday", imageUri: require('../assets/Images/fit3.jpg') },
  { id: '4', title: "Yoga Session", duration: "45 minutes", time: "Saturday", imageUri: require('../assets/Images/fit4.jpg') },
];

const planData = [
  { id: '1', title: "Cardio Training", duration: "55 minutes", description: "10 Mile Run", imageUri: require('../assets/Images/fit5.jpg') },
  { id: '2', title: "Upper Body", duration: "45 minutes", description: "Target Chest", imageUri: require('../assets/Images/fit3.jpg') },
];

export default function FitnessScreen({ navigation }) {
  const [visibleWorkouts, setVisibleWorkouts] = useState(3);
  const [randomQuote, setRandomQuote] = useState(''); // ISAAC State to store random quote

  // new ISAAC Select a random quote when the component mounts
  useEffect(() => {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    setRandomQuote(quote); // Set random quote state
  }, []); // Empty dependency array means it runs only once after the component mounts
  
  const renderWorkoutItem = ({ item }) => (
    <TouchableOpacity style={styles.workoutContainer}>
      <Image source={item.imageUri} style={styles.workoutImage} />
      <View style={styles.workoutInfo}>
        <Text style={styles.workoutTitle}>{item.title}</Text>
        <Text style={styles.workoutDetails}>{item.duration} - {item.time}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={30} color="#4285F4" style={styles.iconStyle} />
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
          {/* ISAAC - Added the overlay container to ensure the quote is visible on the image */}
          <View style={styles.overlayContainer}>
            <Text style={styles.quoteText}>{randomQuote}</Text>
          </View>
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
    position: 'relative', //NEW ISAAC Make the header container relative so that the overlay can be positioned on top
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
  overlayContainer: { // New style for quote overlay
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0, //remove if doesnt work
    height: 200,  // Same height as the image
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Slight dark overlay for readability
    borderRadius: 8, //also remove if doesnt work
    zIndex: 10, // Ensure this is on top
  },
  quoteText: { // Style for the quote text NEW
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    padding: 10,
    margin: 10,
    fontStyle: 'italic',
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
  iconStyle: {
    marginLeft: 10,
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
    backgroundColor: '#4285F4',
    color: 'white',
    padding: 5,
    borderRadius: 10,
    zIndex: 10, // Ensure the icon is above the image
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
    padding: 15,
    marginTop: 10,
  },
  viewAllText: {
    color: '#4285F4',
    fontSize: 16,
  },
});
