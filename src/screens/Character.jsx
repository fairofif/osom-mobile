import { Alert, ImageBackground, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import CharacterButton from "../components/CharacterButton";
import { useState } from "react";
import CustomButton from "../components/CustomButton";
import { restUpdateAva } from "../api/profile";
import { useAuth } from "../context/AuthContext";
import { CommonActions } from "@react-navigation/native";

export default function Character({ navigation }) {
    const [fontsLoaded] = useFonts({
        CherryBombOne: require("../assets/font/CherryBombOne-Regular.ttf"),
        MontserratReg: require("../assets/font/Montserrat-Regular.ttf"),
        LeagueSpartan: require("../assets/font/LeagueSpartan-Medium.ttf"),
    });
    if (!fontsLoaded) {
        return null;
    }

    const { user } = useAuth();

    const [tyo, setTyo] = useState(false);
    const [opip, setOpip] = useState(false);
    const [suki, setSuki] = useState(false);
    const [hanip, setHanip] = useState(false);
    const [aldra, setAldra] = useState(false);
    const [dhea, setDhea] = useState(false);

    const handleTyo = () => {
        if (tyo == true) {
            setTyo(false);
        }
        else {
            setDhea(false);
            setTyo(true);
            setOpip(false);
            setSuki(false);
            setHanip(false);
            setAldra(false);
        }
    }

    const handleOpip = () => {
        if (opip == true) {
            setOpip(false);
        }
        else {
            setDhea(false)
            setTyo(false);
            setOpip(true);
            setSuki(false);
            setHanip(false);
            setAldra(false);
        }
    }

    const handleSuki = () => {
        if (suki == true) {
            setSuki(false);
        }
        else {
            setDhea(false)
            setTyo(false);
            setOpip(false);
            setSuki(true);
            setHanip(false);
            setAldra(false);
        }
    }

    const handleDhea = () => {
        if (dhea == true) {
            setDhea(false);
        }
        else {
            setDhea(true)
            setTyo(false);
            setOpip(false);
            setSuki(false);
            setHanip(false);
            setAldra(false);
        }
    }

    const handleAldra = () => {
        if (aldra == true) {
            setAldra(false);
        }
        else {
            setDhea(false)
            setTyo(false);
            setOpip(false);
            setSuki(false);
            setHanip(false);
            setAldra(true);
        }
    }

    const handleHanip = () => {
        if (hanip == true) {
            setHanip(false);
        }
        else {
            setDhea(false)
            setTyo(false);
            setOpip(false);
            setSuki(false);
            setHanip(true);
            setAldra(false);
        }
    }

    const updateAva = async (idChoosen) => {
        try {
            const userData = {
                avatar_id: idChoosen
            }
            const res = await restUpdateAva(user.token, userData)
            Alert.alert("Game Start")
        } catch (e) {
            Alert.alert(e.message)
        }
    }

    const moveScreenInGame = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'InGame' }]
            })
        )
    }

    const handleStart = async () => {
        if (!hanip && !suki && !opip && !dhea && !tyo && !aldra) {
            Alert.alert("Please choose a character!")
        }
        else if (aldra) {
            await updateAva(1);
            moveScreenInGame();
        }
        else if (hanip) {
            await updateAva(2);
            moveScreenInGame();
        }
        else if (opip) {
            await updateAva(3);
            moveScreenInGame();
        }
        else if (suki) {
            await updateAva(4);
            moveScreenInGame();
        }
        else if (dhea) {
            await updateAva(5);
            moveScreenInGame();
        }
        else {
            await updateAva(6);
            moveScreenInGame();
        }
    }

    return (
        <ImageBackground
            source={require("../assets/image/Background2.png")}
            style={styles.background}
        >
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>
                    Choose Your Fighter!
                </Text>
                <View style={styles.buttonContainer}>
                    <View style={styles.listButtonContainer}>
                        <View style={styles.strecthContainer}>
                            <CharacterButton
                                onPress={handleAldra}
                                character="aldra"
                                isActive={aldra}
                            />
                        </View>
                        <View style={styles.strecthContainer}>
                            <CharacterButton
                                onPress={handleHanip}
                                character="hanip"
                                isActive={hanip}
                            />
                        </View>
                    </View>
                    <View style={styles.listButtonContainer}>
                        <View style={styles.strecthContainer}>
                            <CharacterButton
                                onPress={handleOpip}
                                character="opip"
                                isActive={opip}
                            />
                        </View>
                        <View style={styles.strecthContainer}>
                            <CharacterButton
                                onPress={handleSuki}
                                character="suki"
                                isActive={suki}
                            />
                        </View>
                    </View>
                    <View style={styles.listButtonContainer}>
                        <View style={styles.strecthContainer}>
                            <CharacterButton
                                onPress={handleDhea}
                                character="dhea"
                                isActive={dhea}
                            />
                        </View>
                        <View style={styles.strecthContainer}>
                            <CharacterButton
                                onPress={handleTyo}
                                character="tyo"
                                isActive={tyo}
                            />
                        </View>
                    </View>
                </View>
                <View
                    style={styles.wrapButtonContainer}
                >
                    <CustomButton
                        onPress={handleStart}
                        bgColor='#F8E51E'
                        textColor='black'
                        title="Start"
                    />
                </View>

            </SafeAreaView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover",
        backgroundColor: "#FFF8A7",
    },
    container: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    title: {
        fontFamily: "CherryBombOne",
        fontSize: 30,
        textShadowColor: "#828282",
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 10,
    },
    buttonContainer: {
        width: '100%',
        height: 390,
        justifyContent: 'center',
        alignItems: 'center'
    },
    listButtonContainer: {
        width: '100%',
        height: 130,
        flexDirection: 'row',
        paddingHorizontal: 40,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    strecthContainer: {
        width: 130,
        height: 130,
        alignItems: 'center',
        justifyContent: 'center'
    },
    wrapButtonContainer: {
        width: '88%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})