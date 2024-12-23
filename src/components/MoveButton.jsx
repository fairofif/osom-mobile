import { Image, StyleSheet, TouchableOpacity } from "react-native";

const MoveButton = ({
    onPress,
    move
}) => {
    let moveDisplay;

    if (move === "scissor") {
        moveDisplay = require("../assets/move-scissor.png")
    } else if (move === "rock") {
        moveDisplay = require("../assets/move-rock.png")
    } else if (move === "paper") {
        moveDisplay = require("../assets/move-paper.png")
    }

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image source={moveDisplay} style={{width: 110, height: 110}}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 110,
        width: 110,
        borderRadius: 55
    }
})

export default MoveButton;