// Database.js

// Mock database with hardcoded user data
const users = [
  {
    id: '1',
    email: 'user@example.com',
    password: 'password123', // Plain text password
  },
  // Add more users as needed
];

// Function to get a user by email
export const getUserByEmail = async (email) => {
  return users.find(user => user.email === email);
};

// Function to compare passwords
export const comparePassword = async (password, storedPassword) => {
  return password === storedPassword;
};