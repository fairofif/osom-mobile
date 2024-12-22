import { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

const CharacterButton = ({
    isActive,
    onPress,
    character = "tyo",
}) => {
    const [dirAva, setDirAva] = useState("");

    useEffect(() => {
        if (character === "tyo") {
            setDirAva(require("../assets/image/chara/chara_tyo.png"));
        } else if (character === "opip") {
            setDirAva(require("../assets/image/chara/chara_opip.png"));
        } else if (character === "aldra") {
            setDirAva(require("../assets/image/chara/chara_aldra.png"));
        } else if (character === "suki") {
            setDirAva(require("../assets/image/chara/chara_suki.png"));
        } else if (character === "hanip") {
            setDirAva(require("../assets/image/chara/chara_hanip.png"));
        } else if (character === "dhea") {
            setDirAva(require("../assets/image/chara/chara_dhea.png"));
        }
    }, [character]);

    return (
        <TouchableOpacity
            style={[
                styles.container,
                isActive && styles.activeContainer,
            ]}
            onPress={onPress}
        >
            <Image source={dirAva} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFAE4E",
        height: 100,
        width: 100,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    activeContainer: {
        backgroundColor: "#32CD32",
        height: 110,
        width: 110,
        borderRadius: 75,
    },
});

export default CharacterButton;
