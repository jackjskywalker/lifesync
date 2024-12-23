import SQLite from 'react-native-sqlite-storage';
import bcrypt from 'react-native-bcrypt';

const db = SQLite.openDatabase({ name: 'LifeSyncDB.db', createFromLocation: '~LifeSyncDB.db' });

export const initDatabase = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT UNIQUE, password TEXT)',
        [],
        () => resolve(),
        (_, error) => reject(error)
      );
    });
  });
};

export const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) reject(err);
      else resolve(hash);
    });
  });
};

export const insertUser = (name, email, password) => {
  return new Promise((resolve, reject) => {
    hashPassword(password).then(hash => {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
          [name, email, hash],
          (_, results) => resolve(results),
          (_, error) => reject(error)
        );
      });
    }).catch(reject);
  });
};

export const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users WHERE email = ?',
        [email],
        (_, results) => resolve(results.rows.length > 0 ? results.rows.item(0) : null),
        (_, error) => reject(error)
      );
    });
  });
};

export const comparePassword = (password, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};