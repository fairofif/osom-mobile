import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { useFonts } from "expo-font";
import Icon from "react-native-vector-icons/Ionicons";

export default function Profile({ navigation }) {
  const { logout } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
      Alert.alert("Logged Out");
    } catch (e) {
      Alert.alert(e.message);
    }
  };

  const [fontsLoaded] = useFonts({
    CherryBombOne: require("../assets/font/CherryBombOne-Regular.ttf"),
    MontserratReg: require("../assets/font/Montserrat-Regular.ttf"),
    LeagueSpartan: require("../assets/font/LeagueSpartan-Medium.ttf"),
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
        <View style={styles.settingsButton}>
          <TouchableOpacity
            style={{
              marginBottom: -6,
            }}
          >
            <Icon name="arrow-back-circle" size={36} />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: "LeagueSpartan",
              textAlign: "center",
              fontSize: 24,
            }}
          >
            Profile
          </Text>
          <TouchableOpacity
            style={{
              marginBottom: -6,
            }}
          >
            <Icon name="volume-high-outline" size={36} />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <View style={styles.profile}>
            <Image source={require("../assets/image/chara/chara_aldra.png")} />
            <Text style={styles.textStart}>User's Name</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              marginBottom: 20,
            }}
          >
            <View style={styles.stats}>
              <Text style={styles.statsHeader}>Rank</Text>
              <Text style={styles.statsText}>1</Text>
            </View>
            <View style={styles.stats}>
              <Text style={styles.statsHeader}>Scores</Text>
              <Text style={styles.statsText}>150000</Text>
            </View>
            <View style={styles.stats}>
              <Text style={styles.statsHeader}>Total Matches</Text>
              <Text style={styles.statsText}>100</Text>
            </View>
          </View>
          <View style={styles.logoutButton}>
            <TouchableOpacity onPress={handleLogout}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  profile: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 130,
    height: 130,
  },
  textStart: {
    fontFamily: "CherryBombOne",
    fontSize: 32,
    textShadowColor: "#828282", // Shadow color
    textShadowOffset: { width: 2, height: 2 }, // Offset in x and y direction
    textShadowRadius: 10, // Blur radius for the shadow
    textAlign: "center",
  },
  textParagraph: {
    fontFamily: "LeagueSpartan",
    fontSize: 16,
  },
  settingsButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stats: {
    backgroundColor: "white",
    paddingBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  statsHeader: {
    backgroundColor: "#FEAE4D",
    paddingHorizontal: 20,
    paddingVertical: 5,
    fontFamily: "CherryBombOne",
    fontSize: 16,
    textAlign: "center"
  },
  statsText: {
    fontFamily: "CherryBombOne",
    fontSize: 24,
  },
  logoutButton: {
    backgroundColor: "#CA0000",
    padding: 12,
    borderRadius: 15,
    marginHorizontal: 10,
    width: "100%",
  },
  logoutText: {
    textAlign: "center",
    fontFamily: "Montserrat",
    fontWeight: 500,
    color: "white",
  },
});
