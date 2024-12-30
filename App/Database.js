import * as FileSystem from 'expo-file-system';

const usersFilePath = FileSystem.documentDirectory + 'users.json';

const readUsersFromFile = async () => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(usersFilePath);
    if (!fileInfo.exists) {
      await FileSystem.writeAsStringAsync(usersFilePath, JSON.stringify([]));
    }
    const usersData = await FileSystem.readAsStringAsync(usersFilePath);
    return JSON.parse(usersData);
  } catch (error) {
    console.error('Error reading users file:', error);
    return [];
  }
};

const writeUsersToFile = async (users) => {
  try {
    await FileSystem.writeAsStringAsync(usersFilePath, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error writing users file:', error);
  }
};

export const getUserByEmail = async (email) => {
  const users = await readUsersFromFile();
  return users.find(user => user.email === email);
};

export const comparePassword = async (password, storedPassword) => {
  const hashedPassword = await hashPassword(password);
  return hashedPassword === storedPassword;
};

export const hashPassword = async (password) => {
  return password.split('').reverse().join('');
};

export const insertUser = async (name, email, password) => {
  const users = await readUsersFromFile();
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    throw new Error('User already exists');
  }
  const newUser = {
    id: (Date.now()).toString(),
    name,
    email,
    password,
  };
  users.push(newUser);
  await writeUsersToFile(users);
};
