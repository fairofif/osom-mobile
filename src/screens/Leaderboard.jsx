import React, { useEffect, useState } from "react";
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
import { restLeaderboard } from "../api/profile";
import { useAuth } from "../context/AuthContext";
import CardLeaderBoard from "../components/CardLeaderboard";
import CustomButton from "../components/CustomButton";
import { CommonActions } from "@react-navigation/native";


export default function Leaderboard({navigation}) {
  const [datas, setDatas] = useState([]);
  const [userData, setUserData] = useState(null);
  const { user } = useAuth();

  const getLeaderboardDatas = async () => {
    try {
      const res = await restLeaderboard(user.token)
      setDatas(res.leaderboard)
      setUserData(res.userData)
    } catch (e) {
      console.log(e.message)
    }
  }

  useEffect(() => {
    getLeaderboardDatas();
  }, [])

  const [fontsLoaded] = useFonts({
    CherryBombOne: require("../assets/font/CherryBombOne-Regular.ttf"),
    MontserratReg: require("../assets/font/Montserrat-Regular.ttf"),
    LeagueSpartan: require("../assets/font/LeagueSpartan-Medium.ttf"),
    Boogaloo: require("../assets/font/Boogaloo-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  const handleHome = () => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Dashboard" }],
        })
      );
    }

  const handleProfile = (idPlayer) => {
    console.log(idPlayer)
    navigation.navigate('ProfilePublic', {idPlayer: idPlayer})
  }


  return (
    <ImageBackground
      source={require("../assets/image/Background2.png")}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Leaderboard!</Text>
          <FlatList
            style={styles.flatlistContainer}
            data={datas}
            renderItem= { ({item}) =>
              <CardLeaderBoard
                idPlayer={item.id}
                name={item.fullname}
                rank={item.rank}
                score={item.highscore}
                idUser={userData.id}
                onPress={() => {handleProfile(item.id)}}
              />
            }
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.list}
          />
          <View style={styles.buttonContainer}>
            <CustomButton
              bgColor="#F8E51E"
              textColor="black"
              title="Home"
              onPress={handleHome}
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
    backgroundColor: "#FFF8A7",
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
    alignItems: 'center',
    justifyContent: 'center'
  },
  flatlistContainer: {
    height: '60%',
    width: '95%',
  },
  buttonContainer: {
    width: "90%",
    marginTop: 30
  }
});
