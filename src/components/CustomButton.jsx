import { StyleSheet, TouchableOpacity, Text } from "react-native"
import { useFonts } from "expo-font";

const CustomButton = ({
    onPress,
    bgColor,
    textColor,
    title
}) => {

    const [fontsLoaded] = useFonts({
        CherryBombOne: require("../assets/font/CherryBombOne-Regular.ttf"),
        MontserratMed: require("../assets/font/Montserrat-Medium.ttf"),
    });
    if (!fontsLoaded) {
        return null;
    }

    return (
        <TouchableOpacity style={[styles.buttonLogin, {backgroundColor: bgColor}]} onPress={onPress}>
            <Text style={[styles.textButton, {color: textColor}]}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonLogin: {
        width: "100%",
        paddingVertical: 12,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10
    },
    textButton: {
        fontSize: 16,
        fontFamily: "MontserratMed",
    },
})

export default CustomButton;