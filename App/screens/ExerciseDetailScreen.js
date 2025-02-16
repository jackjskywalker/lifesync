//Chandler: Excerise detail screen created
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ExerciseDetailScreen({ route }) {
    const { exercise } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{exercise}</Text>
            <Text style={styles.description}>Exercise details will go here along with videos to show the workouts.</Text>
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
    description: {
        fontSize: 18,
        lineHeight: 30,
    },
});