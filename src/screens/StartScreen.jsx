import {
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  View,
  Text
} from "react-native";
import { useFonts } from "expo-font";
import CustomButton from "../components/CustomButton";

export default function Start({ navigation }) {
  const handleLogin = () => {
    navigation.replace("Login");
  };

  const handleRegister = () => {
    navigation.replace("Register");
  };

  const [fontsLoaded] = useFonts({
    Montserrat: require("../assets/font/Montserrat-Bold.ttf"),
    CherryBombOne: require("../assets/font/CherryBombOne-Regular.ttf"),
    MontserratMedium: require("../assets/font/Montserrat-Medium.ttf"),
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
          <Text style={styles.title}>Welcome to </Text>
          <Text style={styles.titleOsom}>OSOM!</Text>
          <Text style={styles.subtitle}>Rock, Paper, Scissor</Text>
          <View style={styles.buttonsContainer}>
            <CustomButton
              title="Login"
              onPress={handleLogin}
              bgColor='white'
              textColor='black'
            />
            <CustomButton
              title="Register"
              onPress={handleRegister}
              bgColor='#F8E51E'
              textColor='white'
            />
          </View>

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
  buttonsContainer: {
    height: 105,
    width: '100%',
    justifyContent: 'space-between'
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  card: {
    width: "80%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    fontFamily: "Montserrat",
  },
  titleOsom: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "CherryBombOne",
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 20,
    fontFamily: "MontserratMedium",
  },
  buttonLogin: {
    width: "100%",
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonRegister: {
    width: "100%",
    paddingVertical: 12,
    backgroundColor: "#F8E51E",
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    fontFamily: "MontserratReg",
  },
  buttonTextRegister: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "MontserratReg",
  },
});
