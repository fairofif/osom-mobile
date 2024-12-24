import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { useFonts } from "expo-font";
import Icon from "react-native-vector-icons/Ionicons";

const CardLeaderBoard = ({ name, score, rank, onPress, idUser, idPlayer }) => {
    const [fontsLoaded] = useFonts({
        CherryBombOne: require("../assets/font/CherryBombOne-Regular.ttf"),
        MontserratReg: require("../assets/font/Montserrat-Regular.ttf"),
        LeagueSpartan: require("../assets/font/LeagueSpartan-Medium.ttf"),
        Boogaloo: require("../assets/font/Boogaloo-Regular.ttf"),
    });
    if (!fontsLoaded) {
        return null;
    }

    let trophyColor;
    if (rank === "1") {
        trophyColor = "#F8E51E";
    } else if (rank === "2") {
        trophyColor = "#8f8f8f";
    } else if (rank === "3") {
        trophyColor = "#db8735";
    } else {
        trophyColor = "#bdbdbd";
    }

    return (
        <TouchableOpacity style={idPlayer == idUser ? styles.card2 : styles.card} onPress={onPress}>
            <View style={styles.iconContainer}>
                <Icon name="trophy-outline" size={40} color={trophyColor} />
                <View style={styles.iconOverlay}>
                    <Text style={styles.iconText}>{rank}</Text>
                </View>
            </View>
            <View style={styles.nameContainer}>
                <Text style={styles.rank}>{name}</Text>
            </View>
            <View style={styles.scoreContainer}>
                <Text style={styles.score}>{score}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: "98%",
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
    card2: {
        width: "98%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        borderColor: "#FFAE4E",
        borderWidth: 4,
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
        fontSize: 22,
    },
    score: {
        fontFamily: "CherryBombOne",
        fontSize: 22,
        marginTop: -5,
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
    nameContainer: {
        width: '55%',
        paddingLeft: 5
    },
    scoreContainer: {
        width: '30%',
        height: 40,
        alignItems: 'flex-end',
        justifyContent: 'center'
    }
})

export default CardLeaderBoard;