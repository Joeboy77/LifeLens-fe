import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView, KeyboardAvoidingView, Platform, Image, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signup } from "../api/auth";

export default function SignupScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!fullName || !email || !password) {
      Alert.alert("Validation Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
        // const response = await signup(email, password, fullName);
      console.log("Signup Response:", response.data);
      Alert.alert("Success", "Account created successfully!");
      navigation.replace("Login");
    } catch (error) {
        console.log("Signup Error:", error.response?.data || error.message);
      Alert.alert("Signup Failed", error.response?.data || "Could not register. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={styles.container}
      >
        <View style={styles.innerContainer}>
          {/* Logo Placeholder */}
          <View style={styles.logoContainer}>
            <Image 
              source={require('../../../assets/image.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* Welcome Text */}
          <Text style={styles.welcomeText}>Welcome to Life Lens</Text>
          <Text style={styles.subtitleText}>Create your account</Text>

          {/* Input Fields */}
          <View style={styles.inputGroup}>
            <View style={styles.inputContainer}>
              <TextInput 
                style={styles.input} 
                placeholder="Full Name" 
                placeholderTextColor="#A0AEC0"
                value={fullName} 
                onChangeText={setFullName} 
                autoCorrect={false}
                clearButtonMode="while-editing"
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput 
                style={styles.input} 
                placeholder="Email Address" 
                placeholderTextColor="#A0AEC0"
                value={email} 
                onChangeText={setEmail} 
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput 
                style={styles.input} 
                placeholder="Password" 
                placeholderTextColor="#A0AEC0"
                value={password} 
                onChangeText={setPassword} 
                secureTextEntry={!passwordVisible}
                autoCorrect={false}
                clearButtonMode="while-editing"
              />
              <TouchableOpacity 
                style={styles.passwordToggle}
                onPress={() => setPasswordVisible(!passwordVisible)}
              >
                <Text style={styles.passwordToggleText}>
                  {passwordVisible ? "Hide" : "Show"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Signup Button */}
          <TouchableOpacity 
            style={styles.signupButton} 
            onPress={handleSignup}
          >
            <Text style={styles.signupButtonText}>{loading ? <ActivityIndicator size='small' color="#fff" /> : "Sign Up" }</Text>
          </TouchableOpacity>

          {/* Login Navigation */}
          <View style={styles.loginNavigation}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.loginLinkText}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7FAFC'
  },
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  innerContainer: {
    paddingHorizontal: 30,
    width: '100%'
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center'
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2D3748',
    textAlign: 'center',
    marginBottom: 10
  },
  subtitleText: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    marginBottom: 30
  },
  inputGroup: {
    marginBottom: 20
  },
  inputContainer: {
    marginBottom: 15,
    position: 'relative'
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#2D3748',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  passwordToggle: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -10 }]
  },
  passwordToggleText: {
    color: '#4A5568',
    fontWeight: '600'
  },
  signupButton: {
    backgroundColor: 'blue',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: '#3182CE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5
  },
  signupButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700'
  },
  loginNavigation: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20
  },
  loginText: {
    color: '#718096',
    fontSize: 16
  },
  loginLinkText: {
    color: '#3182CE',
    fontWeight: '700',
    fontSize: 16
  }
});