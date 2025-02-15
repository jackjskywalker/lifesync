//Chandler: Made workout detail screen and mock workouts
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';

const workoutDetails = {
    'Chest and Triceps': {
        beginner: [
            { name: 'Wall Push Ups', sets: '3 sets of 15 reps', imageUri: require('../assets/Images/fit1.jpg') },
            { name: 'Knee Push Ups', sets: '3 sets of 12 reps', imageUri: require('../assets/Images/fit1.jpg') },
            { name: 'Bench Dips', sets: '3 sets of 10 reps', imageUri: require('../assets/Images/fit1.jpg') },
            { name: 'Overhead Arm Extensions', sets: '3 sets of 12 reps', imageUri: require('../assets/Images/fit1.jpg') },
        ],
        intermediate: [
            { name: 'Incline Push Ups', sets: '4 sets of 10 reps', imageUri: require('../assets/Images/fit1.jpg') },
            { name: 'Standard Push Ups', sets: '4 sets of 12 reps', imageUri: require('../assets/Images/fit1.jpg') },
            { name: 'Triceps Dips', sets: '4 sets of 8 reps', imageUri: require('../assets/Images/fit1.jpg') },
            { name: 'Diamond Push Ups', sets: '4 sets of 8 reps', imageUri: require('../assets/Images/fit1.jpg') },
        ],
        advanced: [
            { name: 'Weighted Push-Ups', sets: '4 sets of 10 reps', imageUri: require('../assets/Images/fit1.jpg') },
            { name: 'Archer Push-Ups', sets: '4 sets of 8 reps', imageUri: require('../assets/Images/fit1.jpg') },
            { name: 'Triceps Dips with Legs Elevated', sets: '4 sets of 8 reps', imageUri: require('../assets/Images/fit1.jpg') },
            { name: 'One-Arm Push-Ups', sets: '3 sets of 5 reps', imageUri: require('../assets/Images/fit1.jpg') },
        ],
    },
    'Back and Biceps': {
        beginner: [
            { name: 'Doorway Rows', sets: '3 sets of 15 reps', imageUri: require('../assets/Images/fit1.jpg') },
            { name: 'Superman Hold', sets: '3 sets of 20 seconds', imageUri: require('../assets/Images/fit1.jpg') },
            { name: 'Biceps Curls with Water Bottles', sets: '3 sets of 15 reps', imageUri: require('../assets/Images/fit1.jpg') },
            { name: 'Reverse Flies', sets: '3 sets of 12 reps', imageUri: require('../assets/Images/fit1.jpg') },
        ],
        intermediate: [
            { name: 'Bodyweight Rows', sets: '4 sets of 10 reps', imageUri: require('../assets/Images/fit1.jpg') },
            { name: 'Superman Raises', sets: '4 sets of 15 reps', imageUri: require('../assets/Images/fit1.jpg') },
            { name: 'Bicep Curls with Moderate Weight', sets: '4 sets of 12 reps', imageUri: require('../assets/Images/fit1.jpg') },
            { name: 'Reverse Flies', sets: '4 sets of 10 reps', imageUri: require('../assets/Images/fit1.jpg') },
        ],
        advanced: [
            { name: 'Pull Ups', sets: '4 sets of 8 reps', imageUri: require('../assets/Images/fit1.jpg') },
            { name: 'Superman with Arm Swims', sets: '4 sets of 15 reps', imageUri: require('../assets/Images/fit1.jpg') },
            { name: 'Concentration Curls', sets: '4 sets of 10 reps', imageUri: require('../assets/Images/fit1.jpg') },
            { name: 'T-Bar Rows', sets: '4 sets of 8 reps', imageUri: require('../assets/Images/fit1.jpg') },
        ],
    },
    'Leg Workout': {
        beginner: [
            { name: 'Bodyweight Squats', sets: '3 sets of 15 reps', imageUri: require('../assets/Images/fit1.jpg') },
            { name: 'Glute Bridges', sets: '3 sets of 15 reps', imageUri: require('../assets/Images/fit1.jpg') },
            { name: 'Step-Ups', sets: '3 sets of 12 reps', imageUri: require('../assets/Images/fit1.jpg') },
            { name: 'Wall Sit', sets: '3 sets of 30 seconds', imageUri: require('../assets/Images/fit1.jpg') },
        ],
        intermediate: [
            { name: 'Jump Squats', sets: '4 sets of 12 reps', imageUri: require('../assets/Images/fit1.jpg') },
            { name: 'Single-Leg Glute Bridges', sets: '4 sets of 10 reps', imageUri: require('../assets/Images/fit1.jpg') },
            { name: 'Step-Ups', sets: '4 sets of 10 reps', imageUri: require('../assets/Images/fit1.jpg') },
            { name: 'Bulgarian Split Squats', sets: '4 sets of 8 reps', imageUri: require('../assets/Images/fit1.jpg') },
        ],
        advanced: [
            { name: 'Weighted Squats', sets: '4 sets of 10 reps', imageUri: require('../assets/Images/fit1.jpg') },
            { name: 'Pistol Squats', sets: '3 sets of 5 reps', imageUri: require('../assets/Images/fit1.jpg') },
            { name: 'Step-Ups with Weights', sets: '4 sets of 10 reps', imageUri: require('../assets/Images/fit1.jpg') },
            { name: 'Bulgarian Split Squats with Dumbbells', sets: '4 sets of 8 reps', imageUri: require('../assets/Images/fit1.jpg') },
        ],
    },
    'Cardio Training': {
        beginner: [
            { name: 'Brisk Walk', sets: '3 sets of 10 minutes', imageUri: require('../assets/Images/fit1.jpg') },
            { name: 'Jumping Jacks', sets: '3 sets of 30 seconds', imageUri: require('../assets/Images/fit1.jpg') },
            { name: 'High Knees', sets: '3 sets of 20 reps', imageUri: require('../assets/Images/fit1.jpg') },
            { name: 'Side Steps', sets: '3 sets of 20 reps', imageUri: require('../assets/Images/fit1.jpg') },
        ],
        intermediate: [
            { name: 'Jogging', sets: '3 sets of 10 minutes', imageUri: require('../assets/Images/fit1.jpg') },
            { name: 'Jump Ropes', sets: '3 sets of 1 minute', imageUri: require('../assets/Images/fit1.jpg') },
            { name: 'High Knees', sets: '3 sets of 30 reps', imageUri: require('../assets/Images/fit1.jpg') },
            { name: 'Mountain Climbers', sets: '3 sets of 20 reps', imageUri: require('../assets/Images/fit1.jpg') },
        ],
        advanced: [
            { name: 'Running', sets: '3 sets of 15 minutes', imageUri: require('../assets/Images/fit1.jpg') },
            { name: 'Jump Rope', sets: '3 sets of 2 minutes', imageUri: require('../assets/Images/fit1.jpg') },
            { name: 'Burpees', sets: '3 sets of 15 reps', imageUri: require('../assets/Images/fit1.jpg') },
            { name: 'Skater Jumps', sets: '3 sets of 20 reps', imageUri: require('../assets/Images/fit1.jpg') },
        ],
    },
};

export default function WorkoutDetailScreen({ route, navigation }) {
    const { title, level } = route.params;
    const details = workoutDetails[title]?.[level] || [];

    const navigateToExerciseDetail = (exercise) => {
        navigation.navigate('ExerciseDetail', { exercise });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title} - {level} Level</Text>
            {details.map((item, index) => (
                <TouchableOpacity key={index} style={styles.row} onPress={() => navigateToExerciseDetail(item.name)}>
                    <Image source={item.imageUri} style={styles.image} />
                    <View style={styles.textContainer}>
                        <Text style={styles.exerciseName}>{item.name}</Text>
                        <Text style={styles.setsReps}>{item.sets}</Text>
                    </View>
                    <MaterialIcons name="chevron-right" size={30} color="#4285F4" style={styles.iconStyle} />
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#f0f0f0',
        marginBottom: 10,
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 20,
    },
    textContainer: {
        flex: 1,
    },
    exerciseName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    setsReps: {
        fontSize: 16,
        color: '#555',
    },
    iconStyle: {
        marginLeft: 10,
    },
});