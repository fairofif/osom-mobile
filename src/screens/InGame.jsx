import { Image, ImageBackground, SafeAreaView, StyleSheet, View } from "react-native";
import CharaPhotoInGame from "../components/CharaPhotoInGame";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { restGetUser } from "../api/profile";
import { restNewMatch } from "../api/ingame";
import Health from "../components/Health";

export default function InGame({ navigation }) {
    const { user } = useAuth()

    const [idChara, setIdChara] = useState(0);
    const [health, setHealth] = useState(0);
    const [level, setLevel] = useState(0);
    const [score, setScore] = useState(0);
    const [winStreak, setWinStreak] = useState(0);

    const [ourHand, setOurHand] = useState(null);
    const [opponentHand, setOpponentHand] = useState(null);

    const getIdChara = async () => {
        try {
            const res = await restGetUser(user.token)
            setIdChara(res.avatar_id)
        } catch (e) {
            console.log(e.message)
        }
    }

    const newGame = async () => {
        try {
            const userData = {
                mode: "normal"
            }
            const res = await restNewMatch(user.token, userData)
            setLevel(res.level)
            setHealth(res.health)
            setScore(res.score)
            setWinStreak(res.winstreak)
        } catch (e) {
            console.log(e.message)
        }
    }

    useEffect(() => {
        getIdChara();
        newGame();
    }, [])

    return (
        <ImageBackground
            source={require("../assets/image/Background2.png")}
            style={styles.background}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.topAreaContainer}>
                    <View style={styles.charaContainer}>
                        <CharaPhotoInGame
                            idChara={idChara}
                        />
                    </View>
                    <View style={styles.livesContainer}>
                        <Health count={health}/>
                    </View>
                    <View style={styles.charaContainer}>
                        <Image
                            source={require("../assets/image/chara/chara_bot.png")}
                            style={{height:55, width:55}}
                        />
                    </View>
                </View>
                <View style={styles.scoreContainer}>

                </View>
            </SafeAreaView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover",
    },
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    topAreaContainer: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        justifyContent: 'space-between'
    },
    charaContainer: {
        height: 55,
        width: 55,
        alignItems:'center',
        justifyContent: 'center'
    },
    livesContainer: {
        height: 55,
        width: '65%'
    }
})