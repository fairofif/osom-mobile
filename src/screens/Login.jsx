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

import { restLogin } from "../api/auth";
import TextInputAuth from "../components/TextInputAuth";
import CustomButton from "../components/CustomButton";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Validate
  const [errors, setErrors] = useState({});
  // const [isCheckedError, setIsCheckedError] = useState("");
  // const [isChecked, setIsChecked] = useState("");
  // Buat Modal
  const [modalVisible, setModalVisible] = useState(false);
  const { login: setLoginState } = useAuth();

  const validate = () => {
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!validEmail) {
      setErrors({ messageEmailError: "Email salah!" });
      return false;
    } else if (password.length < 7) {
      setErrors({
        messagePasswordError: "Password harus lebih dari 7 karakter.",
      });
      return false;
    }
    setErrors({});
    return true;
  };

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  const handleLogin = async () => {
    if (validate()) {
      try {
        const userData = {
          email: email,
          password: password,
        };
        const res = await restLogin(userData);
        setLoginState(res.token);
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
          <TextInputAuth
            placeholder="Username atau Email"
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

          {/* Validate dan Term and Condition */}

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
                <ScrollView style={styles.modalBody}>
                  <Text style={styles.modalText}>
                    Aturan main Ketika pemain baru bermain: 1.Gunting vs Batu =
                    Batu 2. Gunting vs Kertas = Gunting 3.Batu vs Kertas =
                    Kertas 4. Kertas vs Batu = Kertas
                  </Text>

                  <TouchableOpacity
                    style={styles.buttonModal}
                    onPress={() => setModalVisible(false)}
                  >
                    <Button title="Tutup" color={"white"} />
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          </Modal>

          <CustomButton
            title="Login"
            onPress={handleLogin}
            bgColor="#F8E51E"
            textColor="black"
          />
          <TouchableOpacity onPress={handleRegister}>
            <Text style={styles.link}>
              Don't have an account?{" "}
              <Text style={styles.linkTo}>Register</Text>
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
  buttonModal: {
    backgroundColor: "#188A8D",
    borderRadius: 5,
    paddingVertical: 5,
    width: 280,
    alignItems: "center",
    alignSelf: "center",
  },
  card: {
    width: "80%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: 20,
    borderRadius: 20,
  },
  errorText: {
    fontSize: 12,
    color: "#FFD700",
    marginBottom: 10,
    marginTop: 0,
    marginLeft: 10,
  },
  title: {
    fontSize: 60,
    color: "#fff",
    textAlign: "center",
    marginBottom: 30,
    fontFamily: "CherryBombOne",
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 10,
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 15,
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
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 15,
  },
  termsText: {
    color: "white",
    fontSize: 14,
  },
  termsLink: {
    fontSize: 14,
    lineHeight: 15,
    fontFamily: "Arial",
    flexDirection: "row",
    alignItems: "center",
    color: "#FFD700",
    textDecorationLine: "underline",
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
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 16,
  },
  headerTitle: {
    fontSize: 18,
    color: "#000",
    textAlign: "center",
  },
  modalBody: {
    paddingHorizontal: 16,
  },
  modalText: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 12,
    color: "#333",
    textAlign: "justify",
  },
});
