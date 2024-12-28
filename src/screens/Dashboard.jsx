import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  ScrollView,
  Alert,
  Image,
  Animated,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { restGetUser } from "../api/profile";
import { useFonts } from "expo-font";
import Icon from "react-native-vector-icons/Ionicons";

export default function Dashboard({ navigation }) {
  const waveAnim = useRef(new Animated.Value(0)).current;
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);

  const [fontsLoaded] = useFonts({
    CherryBombOne: require("../assets/font/CherryBombOne-Regular.ttf"),
    MontserratReg: require("../assets/font/Montserrat-Regular.ttf"),
    LeagueSpartan: require("../assets/font/LeagueSpartan-Medium.ttf"),
  });

  const getUserData = async () => {
      try {
        const res = await restGetUser(user.token);
        setUserData(res);
      } catch (e) {
        console.log(e.message);
      }
    };
  
    useEffect(() => {
      getUserData();
    }, []);

  useEffect(() => {
    const waveAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(waveAnim, {
          toValue: 15, // Rotation angle (degrees)
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(waveAnim, {
          toValue: -15,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(waveAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
      { iterations: 2 } // Only animate twice
    );

    waveAnimation.start();

    return () => waveAnim.stopAnimation(); // Cleanup
  }, [waveAnim]); // Dependency is correct

  if (!fontsLoaded) {
    return null; // Safe to exit if fonts are not loaded
  }

  const handleStartGame = () => {
    navigation.navigate("Character");
  };

  const handleProfile = () => {
    navigation.navigate("Profile");
  };

  const handleLeaderboard = () => {
    navigation.navigate("Leaderboard");
  };

  return (
    <ImageBackground
      source={require("../assets/image/Background2.png")}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <View>
          <View style={styles.profileButton}>
            <View>
              <TouchableOpacity
                style={{
                  marginLeft: 18,
                  marginBottom: -2,
                }}
                onPress={handleLeaderboard}
              >
                <Icon name="trophy-outline" size={36} />
              </TouchableOpacity>
              <Text style={{ fontFamily: "LeagueSpartan" }}>Leaderboard</Text>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  marginBottom: -2,
                }}
                onPress={handleProfile}
              >
                <Icon name="person-outline" size={36} />
              </TouchableOpacity>
              <Text style={{ fontFamily: "LeagueSpartan" }}>Profile</Text>
            </View>
          </View>
          <View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textStart}>Hi, {userData?.fullname}!</Text>
              <Animated.Image
                style={{
                  marginLeft: 10,
                  width: 58,
                  height: 58,
                  transform: [
                    {
                      rotate: waveAnim.interpolate({
                        inputRange: [-15, 15],
                        outputRange: ["-15deg", "15deg"],
                      }),
                    },
                  ],
                }}
                source={require("../assets/hand-dashboard.png")}
              />
            </View>
            <Text style={styles.textEnd}>
              Welcome to game application OSOM!
            </Text>
          </View>
          <View style={styles.ruleDashboard}>
            <Image
              style={{ width: 207, height: 214 }}
              source={require("../assets/rule-dashboard.png")}
            />
          </View>
          <View style={styles.textBoxParagraph}>
            <ScrollView>
              <Text style={styles.textStartParagraph}>Game Rules:</Text>
              <Text style={styles.textParagraph}>
                1. Players will get 5 playing tokens and are asked to choose one
                of three options, which are shown by the hand sign on the screen
                in the shapes of rock, paper, and scissors.
              </Text>
              <Text style={styles.textParagraph}>
                2. Players are given 5 seconds to make a decision.
              </Text>
              <Text style={styles.textParagraph}>
                3. After the player chooses, the screen will show the result of
                both player and robots choices.
              </Text>
              <Text style={styles.textParagraph}>
                4. If the player wins, the player will get +100 points.
              </Text>
              <Text style={styles.textParagraph}>
                5. If the player win streak 3x, the points will be multiplied by
                2.
              </Text>
              <Text style={styles.textParagraph}>
                6. If the player win streak 5x, the points will be multiplied by
                5 and +1 playing token.
              </Text>
              <Text style={styles.textParagraph}>
                7. If the player win streak 10x and so on, the points will be
                multiplied by 10.
              </Text>
              <Text style={styles.textParagraph}>
                8. If the player loses, the player’s playing token will decrease
                -1 point.
              </Text>
              <Text style={styles.textParagraph}>
                {
                  "WIN OR LOSE?\n1.  Rock vs Scissors, Rock wins.\n2. Scissors vs Paper, Scissors wins.\n3. Paper vs Rock, Paper wins."
                }
              </Text>
            </ScrollView>
          </View>
          <View style={styles.playButton}>
            <TouchableOpacity onPress={handleStartGame}>
              <Text style={styles.playText}>Start Playing!</Text>
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
  background: {
    flex: 1,
    resizeMode: "cover",
    backgroundColor: "#FFF8A7",
  },
  textStart: {
    fontFamily: "CherryBombOne",
    fontSize: 40,
    textShadowColor: "#828282", // Shadow color
    textShadowOffset: { width: 2, height: 2 }, // Offset in x and y direction
    textShadowRadius: 10, // Blur radius for the shadow
  },
  textEnd: {
    fontFamily: "LeagueSpartan",
    fontSize: 20,
    marginBottom: 20,
  },
  ruleDashboard: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 15,
    marginHorizontal: 10,
    marginBottom: 20,
  },
  textBoxParagraph: {
    backgroundColor: "white",
    justifyContent: "center",
    padding: 8,
    borderRadius: 15,
    marginHorizontal: 10,
    marginBottom: 20,
    height: 200,
  },
  textStartParagraph: {
    textAlign: "center",
    fontFamily: "CherryBombOne",
    fontSize: 20,
  },
  textParagraph: {
    fontFamily: "LeagueSpartan",
    fontSize: 16,
  },
  profileButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  playButton: {
    backgroundColor: "#F8E51E",
    padding: 12,
    borderRadius: 15,
    marginHorizontal: 10,
  },
  playText: {
    textAlign: "center",
    fontFamily: "MontserratMed",
    fontWeight: 500,
  },
});
