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
import { restGetUser, restLeaderboard } from "../api/profile";
import { useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";
import { CommonActions } from "@react-navigation/native";

export default function Profile({ navigation }) {
  const { user, logout } = useAuth();

  const [userData, setUserData] = useState(null);
  const [dirAva, setDirAva] = useState(null);
  const [rank, setRank] = useState([]);

  const findUserRank = (userRanks, id) => {
    const user = userRanks.find((user) => user.id === id);
    return user ? user.rank : null;
  };

  const getUserData = async () => {
    try {
      const res = await restGetUser(user.token);
      const resRank = await restLeaderboard(user.token);
      setUserData(res)
      setRank(findUserRank(resRank.leaderboard, res.id))
      if (res.avatar_id === 6) {
        setDirAva(require("../assets/image/chara/chara_tyo.png"));
      } else if (res.avatar_id === 3) {
        setDirAva(require("../assets/image/chara/chara_opip.png"));
      } else if (res.avatar_id === 1) {
        setDirAva(require("../assets/image/chara/chara_aldra.png"));
      } else if (res.avatar_id === 4) {
        setDirAva(require("../assets/image/chara/chara_suki.png"));
      } else if (res.avatar_id === 2) {
        setDirAva(require("../assets/image/chara/chara_hanip.png"));
      } else if (res.avatar_id === 5) {
        setDirAva(require("../assets/image/chara/chara_dhea.png"));
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  useEffect(() => {
    getUserData();
  }, [])

  const handleLogout = async () => {
    try {
      await logout();
      Alert.alert("Logged Out");
    } catch (e) {
      Alert.alert(e.message);
    }
  };

  const handleHome = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Dashboard" }],
      })
    );
  }

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
            onPress={handleHome}
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
            <Image source={dirAva} />
            <Text style={styles.textStart}>{userData?.fullname}</Text>
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
              <Text style={styles.statsText}>{rank}</Text>
            </View>
            <View style={styles.stats}>
              <Text style={styles.statsHeader}>Highest Score</Text>
              <Text style={styles.statsText}>{userData?.highscore}</Text>
            </View>
            <View style={styles.stats}>
              <Text style={styles.statsHeader}>Total Matches</Text>
              <Text style={styles.statsText}>{userData?.total_matches}</Text>
            </View>
          </View>
          <View style={styles.logoutButton}>
            <CustomButton
              onPress={handleLogout}
              title="Logout"
              bgColor="#CA0000"
              textColor="#FFFFFF"
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
    padding: 12,
    borderRadius: 15,
    marginHorizontal: 10,
    width: "100%",
  },
});
