import java.io.*;
import java.security.SecureRandom;
import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.util.Scanner;

public class UserManager {
    private static final String KEY_FILE = "key.pem";
    private static final String DATA_FILE = "user_data.txt";
    private static final String ALGORITHM = "AES/GCM/NoPadding";
    private static final int KEY_SIZE = 256; 
    private static final int GCM_TAG_LENGTH = 16; 
    private static final int IV_LENGTH = 12; 

    public static void main(String[] args) throws Exception {
        if (args.length == 0) {
            Scanner scanner = new Scanner(System.in);
            System.out.println("Enter your name:");
            String name = scanner.nextLine();
            System.out.println("Enter your email address:");
            String email = scanner.nextLine();
            System.out.println("Enter your password:");
            String password = scanner.nextLine();
            registerUser(name, email, password);
            scanner.close(); 
        } else if (args[0].equals("login")) {
            login(args[1], args[2]);
        } else if (args[0].equals("show")) {
            showUsers();
        } else {
            System.out.println("Invalid command");
        }
    }

    private static void registerUser(String name, String email, String password) throws Exception {
        Cipher cipher = getCipher(Cipher.ENCRYPT_MODE); 
        byte[] encryptedPassword = encrypt(password, cipher); 
        String userData = name + "," + email + "," + Base64.getEncoder().encodeToString(encryptedPassword);
        writeToFile(userData);
        System.out.println("User registered successfully!");
    }

    private static void login(String name, String password) throws Exception {
        String userData = readFromFile();
        if (userData == null) {
            System.out.println("No users found");
            return;
        }
        String[] parts = userData.split(",");
        String email = parts[1];
        String encryptedPasswordBase64 = parts[2];
        byte[] encryptedPassword = Base64.getDecoder().decode(encryptedPasswordBase64);
        
        Cipher cipher = getCipher(Cipher.DECRYPT_MODE); 
        String decryptedPassword = decrypt(encryptedPassword, cipher);
        
        if (decryptedPassword.equals(password)) {
            System.out.println("Login successful!");
        } else {
            System.out.println("Invalid password");
        }
    }

    private static void showUsers() {
        String userData = readFromFile();
        if (userData == null) {
            System.out.println("No users found");
            return;
        }
        String[] parts = userData.split(",");
        for (String part : parts) {
            System.out.println(part);
        }
    }

    private static Cipher getCipher(int mode) throws Exception {
        Cipher cipher = Cipher.getInstance(ALGORITHM); 
        SecretKeySpec secretKey = getKey();
        byte[] iv = new byte[IV_LENGTH];
        new SecureRandom().nextBytes(iv); 
        GCMParameterSpec spec = new GCMParameterSpec(GCM_TAG_LENGTH * 8, iv); 
        cipher.init(mode, secretKey, spec); 
        return cipher;
    }

    private static SecretKeySpec getKey() throws Exception {
        File keyFile = new File(KEY_FILE);
        if (!keyFile.exists()) {
            generateAndSaveKey(); 
        }
        byte[] key = new byte[32]; 
        try (FileInputStream keyInputStream = new FileInputStream(keyFile)) {
            keyInputStream.read(key);
        }
        return new SecretKeySpec(key, "AES");
    }

    private static void generateAndSaveKey() throws Exception {
        KeyGenerator keyGen = KeyGenerator.getInstance("AES");
        keyGen.init(KEY_SIZE); 
        byte[] key = keyGen.generateKey().getEncoded();
        try (FileOutputStream keyOutputStream = new FileOutputStream(KEY_FILE)) {
            keyOutputStream.write(key);
        }
    }

    private static byte[] encrypt(String password, Cipher cipher) throws Exception {
        byte[] ciphertext = cipher.doFinal(password.getBytes()); 
        byte[] iv = cipher.getIV(); 

        byte[] encryptedData = new byte[iv.length + ciphertext.length];
        System.arraycopy(iv, 0, encryptedData, 0, iv.length);
        System.arraycopy(ciphertext, 0, encryptedData, iv.length, ciphertext.length);

        return encryptedData;
    }

    private static String decrypt(byte[] encryptedData, Cipher cipher) throws Exception {
        byte[] iv = new byte[IV_LENGTH];
        System.arraycopy(encryptedData, 0, iv, 0, IV_LENGTH); 

        byte[] ciphertext = new byte[encryptedData.length - IV_LENGTH];
        System.arraycopy(encryptedData, IV_LENGTH, ciphertext, 0, ciphertext.length); 

        GCMParameterSpec spec = new GCMParameterSpec(GCM_TAG_LENGTH * 8, iv); 
        SecretKeySpec secretKey = getKey(); 
        cipher.init(Cipher.DECRYPT_MODE, secretKey, spec); 
        
        byte[] decrypted = cipher.doFinal(ciphertext); 
        return new String(decrypted); 
    }

    private static void writeToFile(String userData) throws IOException {
        try (FileWriter fileWriter = new FileWriter(DATA_FILE)) {
            fileWriter.write(userData);
        }
    }

    private static String readFromFile() {
        File file = new File(DATA_FILE);
        if (file.exists()) {
            try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
                return reader.readLine(); 
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return null;
    }
}
