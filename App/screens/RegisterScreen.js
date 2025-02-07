// RegisterScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { insertUser, hashPassword } from '../Database';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }

    try {
      const hashedPassword = await hashPassword(password);
      await insertUser(name, email, hashedPassword);
      navigation.navigate('Login');
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/lightLogo1.png')} style={styles.logo} />
      <Text style={styles.title}>LifeSync<Text style={styles.titleAccent}>+</Text></Text> 
      <Text style={styles.heading}>Health + Fitness</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={setName}
        value={name}
        placeholderTextColor= "#2C2D2F80"
      />
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#2C2D2F80"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        placeholderTextColor="#2C2D2F80"
      />
      <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
        <Text style={styles.registerBtnText}>Register</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginLink}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fc',
  },
  logo: {
    alignSelf: 'center',
    width: 230,
    height: 230,
    marginBottom: 10,
  },
  title: {
    alignSelf: 'center',
    fontSize: 40,
    color: '#000000',
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
    borderWidth: 0.5,
    borderColor: '#2C2D2F',
    borderRadius: 5,
    marginBottom:8,
    fontSize: 16,
  },
  registerBtn: {
    backgroundColor: '#2585F8',
    padding: 10,
    borderRadius: 5,
    width: '50%',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 15,
  },
  registerBtnText: {
    color: 'white',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  loginLink: {
    marginTop: 10,
    color: '#2585F8',
  },
});

export default RegisterScreen;