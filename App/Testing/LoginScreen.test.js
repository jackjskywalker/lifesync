import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../screens/LoginScreen';
import { AuthContext } from '../Navigation';
import { getUserByEmail, comparePassword } from '../Database';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('../Database');
jest.mock('@react-native-async-storage/async-storage');

const mockSetIsAuthenticated = jest.fn();

describe('LoginScreen', () => {
  beforeEach(() => {
    getUserByEmail.mockClear();
    comparePassword.mockClear();
    AsyncStorage.setItem.mockClear();
    mockSetIsAuthenticated.mockClear();
  });

  it('should display an error message for invalid email or password', async () => {
    getUserByEmail.mockResolvedValue(null);

    const { getByPlaceholderText, getByText } = render(
      <AuthContext.Provider value={{ setIsAuthenticated: mockSetIsAuthenticated }}>
        <LoginScreen />
      </AuthContext.Provider>
    );

    fireEvent.changeText(getByPlaceholderText('Email Address'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password');
    fireEvent.press(getByText('Login'));

    await waitFor(() => {
      expect(getByText('Invalid email or password')).toBeTruthy();
    });
  });

  it('should login successfully with valid credentials', async () => {
    getUserByEmail.mockResolvedValue({ email: 'test@example.com', password: 'hashedpassword' });
    comparePassword.mockResolvedValue(true);

    const { getByPlaceholderText, getByText } = render(
      <AuthContext.Provider value={{ setIsAuthenticated: mockSetIsAuthenticated }}>
        <LoginScreen />
      </AuthContext.Provider>
    );

    fireEvent.changeText(getByPlaceholderText('Email Address'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password');
    fireEvent.press(getByText('Login'));

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('userToken', 'token');
      expect(mockSetIsAuthenticated).toHaveBeenCalledWith(true);
    });
  });

  it('should display an error message when an error occurs', async () => {
    getUserByEmail.mockRejectedValue(new Error('An error occurred'));

    const { getByPlaceholderText, getByText } = render(
      <AuthContext.Provider value={{ setIsAuthenticated: mockSetIsAuthenticated }}>
        <LoginScreen />
      </AuthContext.Provider>
    );

    fireEvent.changeText(getByPlaceholderText('Email Address'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password');
    fireEvent.press(getByText('Login'));

    await waitFor(() => {
      expect(getByText('An error occurred')).toBeTruthy();
    });
  });
});
