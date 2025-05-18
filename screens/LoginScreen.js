import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { withTimeoutAndRetry, checkInternetConnection, getPlatformTimeout } from "../utils/networkUtils";

export default function LoginScreen() {
  const auth = getAuth();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingConnection, setIsCheckingConnection] = useState(true);

  useEffect(() => {
    // Check internet connection when component mounts
    const checkConnection = async () => {
      try {
        const isConnected = await checkInternetConnection();
        if (!isConnected) {
          Alert.alert(
            "No Internet Connection",
            "Please check your internet connection and try again.",
            [{ text: "OK" }]
          );
        }
      } catch (err) {
        console.error("Error checking internet connection:", err);
      } finally {
        setIsCheckingConnection(false);
      }
    };

    checkConnection();
  }, []);

  const handleLogin = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Use our timeout and retry utility
      await withTimeoutAndRetry(
        async () => {
          await signInWithEmailAndPassword(auth, email, password);
          navigation.replace("Home");
        },
        { timeout: getPlatformTimeout() }
      );
    } catch (e) {
      console.error("Login error:", e);
      setError("Login failed. Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Use our timeout and retry utility
      await withTimeoutAndRetry(
        async () => {
          await createUserWithEmailAndPassword(auth, email, password);
          navigation.replace("Home");
        },
        { timeout: getPlatformTimeout() }
      );
    } catch (e) {
      console.error("Registration error:", e);
      setError("Registration failed. Email may already be in use.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingConnection) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7f61c5" />
        <Text style={styles.loadingText}>Checking connection...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <TouchableOpacity style={styles.googleButton}>
        <Text style={styles.buttonText}>Login with Google</Text>
      </TouchableOpacity>

      <Text style={styles.divider}>────────  OR  ────────</Text>

      {error && <Text style={styles.error}>{error}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!isLoading}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!isLoading}
      />

      <TouchableOpacity 
        style={[styles.button, isLoading && styles.disabledButton]} 
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Log In</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.secondaryButton, isLoading && styles.disabledButton]} 
        onPress={handleRegister}
        disabled={isLoading}
      >
        <Text style={styles.secondaryButtonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff5ee",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff5ee",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#7f61c5",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  disabledButton: {
    opacity: 0.7,
  },
  secondaryButton: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  secondaryButtonText: {
    color: "#333",
    fontWeight: "600",
    fontSize: 16,
  },
  googleButton: {
    backgroundColor: "#4285F4",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  divider: {
    textAlign: "center",
    color: "#aaa",
    marginVertical: 20,
    fontWeight: "500",
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
    fontSize: 14,
  },
});