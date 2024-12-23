import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from "react-native";
import { useFonts } from "expo-font";
import Icon from "react-native-vector-icons/Ionicons";

export default function Leaderboard() {
  const [fontsLoaded] = useFonts({
    CherryBombOne: require("../assets/font/CherryBombOne-Regular.ttf"),
    MontserratReg: require("../assets/font/Montserrat-Regular.ttf"),
    LeagueSpartan: require("../assets/font/LeagueSpartan-Medium.ttf"),
    Boogaloo: require("../assets/font/Boogaloo-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  const leaderboardData = [
    { id: "1", name: "User 1", score: 500 },
    { id: "2", name: "User 2", score: 400 },
    { id: "3", name: "User 3", score: 300 },
    { id: "4", name: "User 4", score: 200 },
    { id: "5", name: "User 5", score: 100 },
  ];

  const renderItem = ({ item, index }) => {
    let trophyColor;

    // Assign colors based on rank
    if (index === 0) {
      trophyColor = "#fcbe00"; // Gold
    } else if (index === 1) {
      trophyColor = "#8f8f8f"; // Silver
    } else if (index === 2) {
      trophyColor = "#db8735"; // Bronze
    } else {
      trophyColor = "#bdbdbd"; // Gray
    }

    return (
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <Icon name="trophy-outline" size={40} color={trophyColor} />
          <View style={styles.iconOverlay}>
            <Text style={styles.iconText}>{index + 1}</Text>
          </View>
        </View>
        <Text style={styles.rank}>{item.name}</Text>
        <Text style={styles.score}>{item.score}</Text>
      </View>
    );
  };

  return (
    <ImageBackground
      source={require("../assets/image/Background2.png")}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Leaderboard!</Text>
          <FlatList
            data={leaderboardData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
          />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Finish!</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  content: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  title: {
    fontFamily: "CherryBombOne",
    fontSize: 40,
    marginBottom: 20,
    textAlign: "center",
    textShadowColor: "#F8E51E", // Shadow color
    textShadowOffset: { width: 4, height: 4 }, // Offset in x and y direction
    textShadowRadius: 20,
  },
  list: {
    width: "100%",
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  rank: {
    fontFamily: "Boogaloo",
    fontSize: 25,
    marginLeft: 10,
  },
  score: {
    fontFamily: "CherryBombOne",
    fontSize: 25,
    marginLeft: 120,
    marginTop: -5,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#F8E51E",
    paddingVertical: 12,
    paddingHorizontal: 120,
    borderRadius: 20,
    elevation: 3,
  },
  buttonText: {
    fontFamily: "Montserrat",
    fontWeight: 500,
    textAlign: "center",
  },
  iconContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  iconOverlay: {
    position: "absolute",
    top: 4,
    right: 10,
    backgroundColor: "white",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  iconText: {
    fontFamily: "Boogaloo",
    fontSize: 18,
    color: "black",
  },
});
