import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  SafeAreaView, 
  KeyboardAvoidingView, 
  Platform,
  Image ,
  ActivityIndicator
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { login } from "../api/auth";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Validation Error", "Please enter both email and password");
      return;
    }

    setLoading(true);
    try {
    //   const response = await login(email, password);
      Alert.alert("Success", "Logged in successfully!");
      navigation.navigate("Main"); 
    } catch (error) {
      Alert.alert("Login Failed", error.response?.data || "Invalid credentials, please try again.");
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
              resizeMode="contain"
            />
          </View>

          {/* Welcome Text */}
          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text style={styles.subtitleText}>Log in to continue</Text>

          {/* Input Fields */}
          <View style={styles.inputGroup}>
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

          {/* Forgot Password */}
          <TouchableOpacity 
            style={styles.forgotPasswordContainer}
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity 
            style={styles.loginButton} 
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>{loading ? <ActivityIndicator size='small' color='#fff' /> : "Login"}</Text>
          </TouchableOpacity>

          {/* Signup Navigation */}
          <View style={styles.signupNavigation}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text style={styles.signupLinkText}>Sign Up</Text>
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
    marginBottom: 10
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
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 20
  },
  forgotPasswordText: {
    color: '#3182CE',
    fontWeight: '600'
  },
  loginButton: {
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
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700'
  },
  signupNavigation: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20
  },
  signupText: {
    color: '#718096',
    fontSize: 16
  },
  signupLinkText: {
    color: '#3182CE',
    fontWeight: '700',
    fontSize: 16
  }
});