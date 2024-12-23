import React, { useEffect, useState, useRef } from "react";
import {
    Animated,
    Image,
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import CharaPhotoInGame from "../components/CharaPhotoInGame";
import { useAuth } from "../context/AuthContext";
import { restGetUser } from "../api/profile";
import { restNewMatch, restTakeTurn } from "../api/ingame";
import Health from "../components/Health";
import { useFonts } from "expo-font";
import HandDisplay from "../components/HandDisplay";
import MoveButton from "../components/MoveButton";
import { CommonActions } from "@react-navigation/native";
import InGamePopUp from "../components/InGamePopUp";
import CustomButton from "../components/CustomButton";

export default function InGame({ navigation }) {
    const { user } = useAuth();

    const [idChara, setIdChara] = useState(0);
    const [health, setHealth] = useState(0);
    const [level, setLevel] = useState(0);
    const [score, setScore] = useState(0);
    const [winStreak, setWinStreak] = useState(0);
    const [win, setWin] = useState(null);
    const [message, setMessage] = useState(null);
    const [addedHealth, setAddedHealth] = useState(0);
    const [winImageSource, setWinImageSource] = useState(null);
    const [loseImageSource, setLoseImageSource] = useState(null);
    const [addedScore, setAddedScore] = useState(0);

    const gameOverSource = require("../assets/image/ingame-popup/game-over.png")

    const [ourHand, setOurHand] = useState(null);
    const [opponentHand, setOpponentHand] = useState(null);

    const popupOpacity = useRef(new Animated.Value(0)).current; // Popup animation opacity

    const [fontsLoaded] = useFonts({
        CherryBombOne: require("../assets/font/CherryBombOne-Regular.ttf"),
    });
    if (!fontsLoaded) {
        return null;
    }

    const getIdChara = async () => {
        try {
            const res = await restGetUser(user.token);
            setIdChara(res.avatar_id);
        } catch (e) {
            console.log(e.message);
        }
    };

    const newGame = async () => {
        try {
            const userData = {
                mode: "normal",
            };
            const res = await restNewMatch(user.token, userData);
            setLevel(res.level);
            setHealth(res.health);
            setScore(res.score);
            setWinStreak(res.winstreak);
        } catch (e) {
            console.log(e.message);
        }
    };

    useEffect(() => {
        if (message == null) {
            getIdChara();
            newGame();
        } else if (message === "Match is over") {
            handleEndGame();
        }
    }, [message]);

    useEffect(() => {
        if (idChara == 1) {
            setWinImageSource(require("../assets/image/ingame-popup/win-aldra.png"))
            setLoseImageSource(require("../assets/image/ingame-popup/lose-aldra.png"))
        } else if (idChara == 2) {
            setWinImageSource(require("../assets/image/ingame-popup/win-hanip.png"))
            setLoseImageSource(require("../assets/image/ingame-popup/lose-hanip.png"))
        } else if (idChara == 3) {
            setWinImageSource(require("../assets/image/ingame-popup/win-opip.png"))
            setLoseImageSource(require("../assets/image/ingame-popup/lose-opip.png"))
        } else if (idChara == 4) {
            setWinImageSource(require("../assets/image/ingame-popup/win-suki.png"))
            setLoseImageSource(require("../assets/image/ingame-popup/lose-suki.png"))
        } else if (idChara == 5) {
            setWinImageSource(require("../assets/image/ingame-popup/win-dhea.png"))
            setLoseImageSource(require("../assets/image/ingame-popup/lose-dhea.png"))
        } else if (idChara == 6) {
            setWinImageSource(require("../assets/image/ingame-popup/win-tyo.png"))
            setLoseImageSource(require("../assets/image/ingame-popup/lose-tyo.png"))
        }
    }, [idChara])

    useEffect(() => {
        if (win === "Win" || win === "Lose") {
            Animated.sequence([
                Animated.timing(popupOpacity, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.delay(500),
                Animated.timing(popupOpacity, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                setTimeout(() => setWin(null), 0);
            });
        }
    }, [win]);

    const handleMove = async (move) => {
        try {
            setOurHand((prev) => move);
            const userData = {
                move: move,
            };
            const res = await restTakeTurn(user.token, userData);
            if (res.computer_move === "gunting") {
                setOpponentHand((prev) => "right-scissor");
            } else if (res.computer_move === "batu") {
                setOpponentHand((prev) => "right-rock");
            } else if (res.computer_move === "kertas") {
                setOpponentHand((prev) => "right-paper");
            }

            if (move === "gunting") {
                setOurHand((prev) => "left-scissor");
            } else if (move === "batu") {
                setOurHand((prev) => "left-rock");
            } else if (move === "kertas") {
                setOurHand((prev) => "left-paper");
            }

            setHealth((prev) => res.data.health);
            setAddedScore((prev) => (res.data.score - score))
            setScore((prev) => res.data.score);
            setWin((prev) => res.result);
            setMessage((prev) => res.message);
            setWinStreak((prev) => res.data.winstreak);
            setAddedHealth((prev) => res.data.addedHealth)
            await new Promise((resolve) => setTimeout(resolve, 0));
        } catch (e) {
            console.log(e.message);
        }
    };

    const handleEndGame = () => {
        if (message === "Match is over") {
            Animated.sequence([
                Animated.timing(popupOpacity, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.delay(2000),
                Animated.timing(popupOpacity, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                setTimeout(() => setWin(null), 0);
            });
        }

    };

    const handleMoveToLeaderBoard = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: "Dashboard" }],
            })
        );
    }

    return (
        <ImageBackground
            source={require("../assets/image/Background2.png")}
            style={styles.background}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.topAreaContainer}>
                    <View style={styles.charaContainer}>
                        <CharaPhotoInGame idChara={idChara} />
                    </View>
                    <View style={styles.livesContainer}>
                        <Health count={health} />
                    </View>
                    <View style={styles.charaContainer}>
                        <Image
                            source={require("../assets/image/chara/chara_bot.png")}
                            style={{ height: 55, width: 55 }}
                        />
                    </View>
                </View>
                <View style={styles.scoreContainer}>
                    <Text style={styles.score}>{score}</Text>
                </View>
                <View style={styles.displayHandContainer}>
                    <HandDisplay move={ourHand} />
                    <HandDisplay move={opponentHand} />
                </View>
                <View style={styles.buttonMoveContainer}>
                    <View style={styles.moveContainerDown}>
                        <MoveButton
                            move="scissor"
                            onPress={() => handleMove("gunting")}
                        />
                    </View>
                    <View style={styles.moveContainerUp}>
                        <MoveButton
                            move="rock"
                            onPress={() => handleMove("batu")}
                        />
                    </View>
                    <View style={styles.moveContainerDown}>
                        <MoveButton
                            move="paper"
                            onPress={() => handleMove("kertas")}
                        />
                    </View>
                </View>

                {/* Popup Animation */}
                <Animated.View
                    style={[
                        styles.popupContainer,
                        { opacity: popupOpacity }, // Bind opacity to animation
                    ]}
                >
                    <InGamePopUp
                        source={
                            win === 'Win'
                                ? winImageSource
                                : win === 'Lose'
                                    ? loseImageSource
                                    : message === "Match is over"
                                    && gameOverSource
                        }
                        addedHealth={addedHealth}
                        addedScore={addedScore}
                    />
                </Animated.View>
                {message === "Match is over" &&
                    <View style={styles.popupButton}>
                        <CustomButton
                            title="End Game"
                            onPress={handleMoveToLeaderBoard}
                            bgColor="#F8E51E"
                            textColor="#FFFFFF"
                        />
                    </View>
                }
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover",
    },
    popupButton: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: 200,
        top: '62%'
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
    },
    topAreaContainer: {
        width: "100%",
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        justifyContent: "space-between",
    },
    charaContainer: {
        height: 55,
        width: 55,
        alignItems: "center",
        justifyContent: "center",
    },
    livesContainer: {
        height: 55,
        width: "65%",
    },
    scoreContainer: {
        width: "100%",
        height: 90,
        alignItems: "center",
        justifyContent: "center",
    },
    score: {
        fontFamily: "CherryBombOne",
        fontSize: 70,
    },
    displayHandContainer: {
        width: "100%",
        height: 210,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    buttonMoveContainer: {
        width: "100%",
        height: 200,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        paddingHorizontal: 20,
    },
    moveContainerUp: {
        height: "100%",
        width: 110,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    moveContainerDown: {
        height: "100%",
        width: 110,
        alignItems: "center",
        justifyContent: "flex-end",
    },
    popupContainer: {
        position: "absolute",
        top: "30%",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
    },
});
