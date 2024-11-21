import java.io.*;
import java.security.SecureRandom;
import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class UserManager {
    private static final String KEY_FILE = "key.pem";
    private static final String DATA_FILE = "user_data.txt";
    private static final String ALGORITHM = "AES/GCM/NoPadding";
    private static final int KEY_SIZE = 256; 
    private static final int GCM_TAG_LENGTH = 16; 
    private static final int IV_LENGTH = 12; 

    public static void main(String[] args) throws Exception {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Enter your email address:");
        String email = scanner.nextLine();

        if (!isValidEmail(email)) {
            System.out.println("Invalid email format. Please enter a valid email address (e.g., xxx@xxx.xxx).");
            return; 
        }

        if (userExists(email)) {
            System.out.println("Enter your password:");
            String password = scanner.nextLine();

            if (login(email, password)) {
                System.out.println("Login successful!");
            } else {
                System.out.println("Invalid password. Login failed.");
            }
        } else {
            System.out.println("Email not found. Would you like to register a new account? (y/n)");
            String response = scanner.nextLine();
            if (response.equalsIgnoreCase("y")) {
                registerUser(scanner, email);
            } else {
                System.out.println("Goodbye!");
            }
        }

        scanner.close();
    }

    private static boolean isValidEmail(String email) {
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        Pattern pattern = Pattern.compile(emailRegex); 
        Matcher matcher = pattern.matcher(email); 
        return matcher.matches(); 
    }

    private static boolean userExists(String email) throws IOException {
        BufferedReader reader = new BufferedReader(new FileReader(DATA_FILE));
        String line;
        while ((line = reader.readLine()) != null) {
            String[] parts = line.split(",");
            String storedEmail = parts[1];
            if (storedEmail.equals(email)) {
                reader.close();
                return true; 
            }
        }
        reader.close();
        return false; 
    }

    private static boolean login(String email, String password) throws Exception {
        BufferedReader reader = new BufferedReader(new FileReader(DATA_FILE));
        String line;
        while ((line = reader.readLine()) != null) {
            String[] parts = line.split(",");
            String storedEmail = parts[1];
            String encryptedPasswordBase64 = parts[2];

            byte[] encryptedPassword = Base64.getDecoder().decode(encryptedPasswordBase64); 

            if (email.equals(storedEmail)) {
                Cipher cipher = getCipher(Cipher.DECRYPT_MODE);
                String decryptedPassword = decrypt(encryptedPassword, cipher);
                reader.close();
                return decryptedPassword.equals(password);
            }
        }
        reader.close();
        return false;
    }

    private static void registerUser(Scanner scanner, String email) throws Exception {
        System.out.println("Enter your name:");
        String name = scanner.nextLine();
        System.out.println("Enter your password:");
        String password = scanner.nextLine();

        Cipher cipher = getCipher(Cipher.ENCRYPT_MODE);
        byte[] encryptedPassword = encrypt(password, cipher);
        String encryptedPasswordBase64 = Base64.getEncoder().encodeToString(encryptedPassword);

        String userData = name + "," + email + "," + encryptedPasswordBase64 + "\n";
        writeToFile(userData);
        System.out.println("User registered successfully!");
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

    private static void writeToFile(String userData) throws IOException {
        try (FileWriter writer = new FileWriter(DATA_FILE, true)) {
            writer.write(userData);
        }
    }
}
