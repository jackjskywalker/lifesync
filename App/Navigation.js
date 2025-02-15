// Navigation.js
import React, { useEffect, useState, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from 'react-native-vector-icons';
import FitnessScreen from './screens/FitnessScreen';
import HealthScreen from './screens/HealthScreen';
import StatsScreen from './screens/StatsScreen';
import SettingsScreen from './screens/SettingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import WorkoutRoutineScreen from './screens/WorkoutRoutineScreen';
import WorkoutDetailScreen from './screens/WorkoutDetailScreen';
import ExerciseDetailScreen from './screens/ExerciseDetailScreen';
import RecipeDetailScreen from './screens/RecipeDetailScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const AuthContext = createContext();

const FitnessStackNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name="Fitness" component={FitnessScreen} options={{ headerShown: false }} />
        <Stack.Screen name="WorkoutRoutine" component={WorkoutRoutineScreen} />
        <Stack.Screen name="WorkoutDetail" component={WorkoutDetailScreen} />
        <Stack.Screen name="ExerciseDetail" component={ExerciseDetailScreen} />
    </Stack.Navigator>
);

const HealthStackNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name="Health" component={HealthScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
    </Stack.Navigator>
);

const MainTabNavigator = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                // Assign iscons based on the route name
                if (route.name === 'Fitness') {
                    iconName = 'bolt';
                } else if (route.name === 'Health') {
                    iconName = 'person';
                } else if (route.name === 'Stats') { // For stats screen
                    iconName = 'trending-up'; // You can change the icon name based on your preference
                } else if (route.name === 'Settings') {
                    iconName = 'settings';
                }

                return <MaterialIcons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#007bff', // Active tint color
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: { paddingBottom: 15, paddingTop: 5 }, // More padding above icons
        })}
    >
        <Tab.Screen name="Fitness" component={FitnessStackNavigator} />
        <Tab.Screen name="Health" component={HealthStackNavigator} />
        <Tab.Screen name="Stats" component={StatsScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
);

const Navigation = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuthentication = async () => {
            const userToken = await AsyncStorage.getItem('userToken');
            if (userToken) {
                setIsAuthenticated(true);
            }
            setLoading(false);
        };

        checkAuthentication();
    }, []);

    if (loading) {
        return null; // or a loading spinner
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    {isAuthenticated ? (
                        <Stack.Screen name="MainMenu" component={MainTabNavigator} />
                    ) : (
                        <>
                            <Stack.Screen name="Login" component={LoginScreen} />
                            <Stack.Screen name="Register" component={RegisterScreen} />
                            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                        </>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    );
};

export default Navigation;