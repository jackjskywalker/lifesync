import React, { useEffect, useState, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from 'react-native-vector-icons';
import FitnessScreen from './screens/FitnessScreen';
import HealthScreen from './screens/HealthScreen';
import SettingsScreen from './screens/SettingScreen';
import LoginScreen from './screens/LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const AuthContext = createContext();

const MainTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        let iconColor = focused ? '#007bff' : 'gray'; // Same color as logout button when focused

        if (route.name === 'Fitness') {
          iconName = 'bolt';
        } else if (route.name === 'Health') {
          iconName = 'person'; // Update to match the screenshot
        } else if (route.name === 'Settings') {
          iconName = 'settings';
        }

        return <MaterialIcons name={iconName} size={size} color={iconColor} />;
      },
      tabBarActiveTintColor: '#007bff', // Active tint color
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: { paddingBottom: 10, paddingTop: 10 }, // More padding above icons
    })}
  >
    <Tab.Screen name="Fitness" component={FitnessScreen} />
    <Tab.Screen name="Health" component={HealthScreen} />
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
          {!isAuthenticated ? (
            <Stack.Screen name="Login" component={LoginScreen} />
          ) : (
            <Stack.Screen name="MainMenu" component={MainTabNavigator} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default Navigation;