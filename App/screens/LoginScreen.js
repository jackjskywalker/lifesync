// LoginScreen.js

import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { getUserByEmail, comparePassword } from '../Database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../Navigation';
import { StatusBar } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const user = await getUserByEmail(email);
      if (user && await comparePassword(password, user.password)) {
        await AsyncStorage.setItem('userToken', 'token'); // Placeholder token
        setIsAuthenticated(true);
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light" />
      <Image source={require('../assets/lightLogo1.png')} style={styles.logo} />
      <Text style={styles.title}>LifeSync<Text style={styles.titleAccent}>+</Text></Text> 
      <Text style={styles.heading}>Health + Fitness</Text>
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor= "#2C2D2F80"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        placeholderTextColor="#2C2D2F80"
      />
      <View style={{ width: '90%', alignSelf: 'center' }}></View>
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginBtnText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.errorText}>{error}</Text>
      <Text style={styles.registerText}>Not a member? <Text style={styles.registerLink} onPress={() => navigation.navigate('Register')}>Register now</Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    color: '#2C2D2F',
    backgroundColor: '#F4F5F7',
  },
  logo: {
    alignSelf: 'center',
    width: 230,
    height: 230,
    marginBottom: 10,
    marginTop: 100,
  },
  title: {
    alignSelf: 'center',
    fontSize: 40,
    color: '#2C2D2F',
    letterSpacing: 3,
    fontWeight: 'bold',
  },
  titleAccent: {
    color: '#0690ffff',
    fontWeight: 'bold',
  },
  heading: {
    alignSelf: 'center',
    marginBottom: 45,
    color: '#0690ffff',
    letterSpacing: 3,
    fontSize: 20,
  },
  input: {
    alignSelf: 'center',
    width: '90%',
    padding: 10,
    borderWidth: 0.75,
    borderColor: '#2C2D2F',
    borderRadius: 5,
    marginBottom: 8,
    fontSize: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-start',
    textAlign: 'left',
    marginLeft: 20,
    color: '#0690ffff',
    marginBottom: 25,
  },
  loginBtn: {
    backgroundColor: '#0690ffff',
    padding: 10,
    borderRadius: 5,
    width: '50%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  loginBtnText: {
    color: 'white',
    fontSize: 16,
  },
  errorText: {
    alignSelf: 'center',
    color: 'red',
    marginTop: 10,
  },
  registerText: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 14,
    color: '#2C2D2F',
  },
  registerLink: {
    color: '#0690ffff',
  },
});

export default LoginScreen;