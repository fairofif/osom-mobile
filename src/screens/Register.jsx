import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  View,
  Text,
  Modal,
  ScrollView,
  Button,
  Alert,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useFonts } from "expo-font";
import { Checkbox } from "react-native-paper";
import TextInputAuth from "../components/TextInputAuth";
import CustomButton from "../components/CustomButton";
import { restRegister } from "../api/auth";

export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // Validate
  const [errors, setErrors] = useState({});
  const [isCheckedError, setIsCheckedError] = useState("");
  const [isChecked, setIsChecked] = useState("");
  // Buat Modal
  const [modalVisible, setModalVisible] = useState(false);

  const validate = () => {
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (username.length < 3) {
      setErrors({
        messageUsernameError: "Username harus lebih dari 3 Karakter.",
      });
      return false;
    } else if (!validEmail) {
      setErrors({
        messageEmailError: "Email salah!",
      });
      return false;
    } else if (password.length < 7) {
      setErrors({
        messagePasswordError: "Password harus lebih dari 7 karakter.",
      });
      return false;
    } else if (!isChecked) {
      setIsCheckedError("Anda harus menyetujui syarat & ketentuan.");
      return false;
    }
    setErrors({});
    setIsCheckedError("");
    return true;
  };

  const handleLogin = () => {
    navigation.replace("Start");
    navigation.navigate("Login");
  };

  const handleRegister = async () => {
    if (validate()) {
      try {
        const userData = {
          fullname: username,
          email: email,
          password: password,
        };
        const res = await restRegister(userData);
        Alert.alert("User Registered");
        navigation.replace("Start");
      } catch (e) {
        Alert.alert(e.message);
      }
    }
  };

  const [fontsLoaded] = useFonts({
    CherryBombOne: require("../assets/font/CherryBombOne-Regular.ttf"),
    MontserratReg: require("../assets/font/Montserrat-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground
      source={require("../assets/image/Background.png")}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>OSOM!</Text>
          <Text style={[styles.termsText, { marginBottom: 10 }]}>
            Please register to login
          </Text>
          <TextInputAuth
            placeholder="Full Name"
            value={username}
            onChangeText={(text) => setUsername(text)}
            autoCorrect={false}
            autoCapitalize="none"
          />
          {errors.messageUsernameError && (
            <Text style={styles.errorText}>{errors.messageUsernameError}</Text>
          )}
          <TextInputAuth
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          {errors.messageEmailError && (
            <Text style={styles.errorText}>{errors.messageEmailError}</Text>
          )}
          <TextInputAuth
            placeholder="Password"
            value={password}
            textContentType="password"
            onChangeText={(text) => setPassword(text)}
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry
          />
          {errors.messagePasswordError && (
            <Text style={styles.errorText}>{errors.messagePasswordError}</Text>
          )}

          {/* Validate dan TnC */}
          <View style={{ marginBottom: 20 }}>
            <View style={styles.termsContainer}>
              <View style={styles.checkboxContainer}>
                <Checkbox
                  status={isChecked ? "checked" : "unchecked"}
                  color="#088A85"
                  onPress={() => setIsChecked((prev) => !prev)}
                  // style={{ width: 10, height: 10, alignItems: "center" }}
                />
              </View>
              <Text style={styles.termsText}>
                Accept{" "}
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <Text style={styles.termsLink}>Terms And Condition</Text>
                </TouchableOpacity>
                <Text style={{ color: "red" }}> *</Text>
              </Text>
            </View>
            {isCheckedError && (
              <Text style={styles.errorText}>{isCheckedError}</Text>
            )}
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                {/* Header */}
                <View style={styles.modalHeader}>
                  <Text style={styles.headerTitle}>Terms and Conditions</Text>
                </View>

                {/* Scrollable Content */}
                <ScrollView contentContainerStyle={styles.modalBody}>
                  <Text style={styles.modalText}>
                    Terms and Conditions for Using the OSOM Application{"\n\n"}
                    1. Introduction{"\n"}
                    By accessing and using the Osom Application, you agree to be
                    bound by these Terms and Conditions. If you do not agree
                    with these Terms and Conditions, please stop using the
                    Application immediately.{"\n\n"}
                    2. Use License{"\n"}
                    We grant you a limited, non-exclusive, non-transferable
                    license to use the Application.{"\n\n"}
                    3. User Content{"\n"}
                    You are fully responsible for everything you do through the
                    Application. You may not do anything that is unlawful,
                    violates third party rights, or is offensive.{"\n\n"}
                    4. In-App Purchases{"\n"}
                    If the App offers in-app purchases, you agree to pay all
                    fees associated with such.{"\n\n"}
                    5. Privacy{"\n"}
                    We will manage your personal data in accordance with our
                    Privacy Policy.{"\n\n"}
                    6. Disclaimer of Warranties{"\n"}
                    The Application is provided "as is" .....
                  </Text>
                </ScrollView>

                <TouchableOpacity
                  style={styles.buttonModal}
                  onPress={() => setModalVisible(false)}
                >
                  <Button
                    title="Tutup"
                    color={"white"}
                    onPress={() => setModalVisible(false)}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* <Icon name="mail" size={20} color="#4CAF50" style={styles.icon} /> */}
          <CustomButton
            onPress={handleRegister}
            title="Register"
            bgColor="#F8E51E"
            textColor="black"
          />
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.link}>
              Already have account? <Text style={styles.linkTo}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  buttonLogin: {
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#F8E51E",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonModal: {
    marginTop: 10,
    backgroundColor: "#FFD700",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  card: {
    width: "80%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
  },
  checkboxContainer: {
    width: 20,
    height: 20,
    marginRight: 6,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  errorText: {
    fontSize: 12,
    color: "#FFD700",
    marginBottom: 10,
    marginLeft: 10,
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 15,
  },
  termsText: {
    color: "white",
    fontSize: 14,
    fontFamily: "MontserratReg",
    textShadowColor: "#636363",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  termsLink: {
    fontSize: 14,
    color: "#FFD700",
    textDecorationLine: "underline",
    textShadowColor: "#636363",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  title: {
    fontSize: 60,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "CherryBombOne",
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 10,
  },
  textButton: {
    fontSize: 16,
    color: "white",
    fontFamily: "MontserratReg",
  },
  link: {
    marginTop: 10,
    color: "white",
    textAlign: "center",
    fontFamily: "MontserratReg",
    textShadowColor: "#636363",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  linkTo: {
    marginTop: 10,
    color: "#FFD700",
    textAlign: "center",
    textDecorationLine: "underline",
    fontFamily: "MontserratReg",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "justify",
    color: "#333",
  },
  modalContent: {
    width: "90%",
    maxHeight: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  modalHeader: {
    marginBottom: 10,
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 45,
    paddingLeft: 20,
    marginBottom: 20,
    backgroundColor: "#f4f4f4",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#ccc",
    fontSize: 16,
    color: "#333",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
