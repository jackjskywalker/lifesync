//Chandler: Made Workout Routine Screen for workout routine screen selection
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';

const workoutRoutines = {
    '1': { title: "Chest and Triceps", beginner: "Push-ups, Bench Press", intermediate: "Incline Bench Press, Dumbbell Flyes", hard: "Weighted Dips, Chest Fly Machine" },
    '2': { title: "Leg Workout", beginner: "Bodyweight Squats, Lunges", intermediate: "Leg Press, Bulgarian Split Squats", hard: "Deadlifts, Barbell Squats" },
    '3': { title: "Cardio Training", beginner: "Walking, Light Jogging", intermediate: "Running, Cycling", hard: "HIIT, Sprint Intervals" },
    '4': { title: "Yoga Session", beginner: "Basic Poses, Breathing Exercises", intermediate: "Sun Salutation, Warrior Poses", hard: "Advanced Poses, Extended Sessions" },
    '5': { title: "Back and Biceps", beginner: "Doorway Rows, Superman Hold, Biceps Curls water bottles, Reverse Flies", intermediate: "Bodyweight Rows, Superman Raises, Bicep Curls moderate weight, Reverse Flies", advanced: "Pull ups, Superman with arm swims, Concentration Curls, T-Bar Rows (weight or resistance band)" },
};

const images = {
    beginner: require('../assets/Images/fit1.jpg'),
    intermediate: require('../assets/Images/fit1.jpg'),
    hard: require('../assets/Images/fit1.jpg'),
};

export default function WorkoutRoutineScreen({ route, navigation }) {
    const { categoryId } = route.params;
    const workout = workoutRoutines[categoryId];

    const navigateToDetails = (level) => {
        navigation.navigate('WorkoutDetail', { title: workout.title, level, routine: workout[level] });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{workout.title}</Text>
            <View style={styles.boxContainer}>
                <TouchableOpacity style={styles.box} onPress={() => navigateToDetails('beginner')}>
                    <Image source={images.beginner} style={styles.image} />
                    <View style={styles.textContainer}>
                        <Text style={styles.boxTitle}>Beginner</Text>
                    </View>
                    <MaterialIcons name="chevron-right" size={30} color="#4285F4" style={styles.iconStyle} />
                </TouchableOpacity>
                <View style={styles.separator} />
                <TouchableOpacity style={styles.box} onPress={() => navigateToDetails('intermediate')}>
                    <Image source={images.intermediate} style={styles.image} />
                    <View style={styles.textContainer}>
                        <Text style={styles.boxTitle}>Intermediate</Text>
                    </View>
                    <MaterialIcons name="chevron-right" size={30} color="#4285F4" style={styles.iconStyle} />
                </TouchableOpacity>
                <View style={styles.separator} />
                <TouchableOpacity style={styles.box} onPress={() => navigateToDetails('advanced')}>
                    <Image source={images.hard} style={styles.image} />
                    <View style={styles.textContainer}>
                        <Text style={styles.boxTitle}>Hard</Text>
                    </View>
                    <MaterialIcons name="chevron-right" size={30} color="#4285F4" style={styles.iconStyle} />
                </TouchableOpacity>
            </View>
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
    boxContainer: {
        flex: 1,
    },
    box: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#f0f0f0',
    },
    separator: {
        height: 1,
        backgroundColor: '#ddd',
        marginVertical: 10,
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 20,
    },
    textContainer: {
        flex: 1,
    },
    boxTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    iconStyle: {
        marginLeft: 10,
    },
});