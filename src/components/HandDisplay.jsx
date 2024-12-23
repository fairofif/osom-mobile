const { Image } = require("react-native");

const HandDisplay = ({
    move = null
}) => {
    let dirHand;

    if (move === "left-rock") {
        dirHand = require("../assets/hand-left-rock.png")
    } else if (move === "left-scissor") {
        dirHand = require("../assets/hand-left-scissor.png")
    } else if (move === "left-paper") {
        dirHand = require("../assets/hand-left-paper.png")
    } else if (move === "right-rock") {
        dirHand = require("../assets/hand-right-rock.png")
    } else if (move === "right-scissor") {
        dirHand = require("../assets/hand-right-scissor.png")
    } else if (move === "right-paper") {
        dirHand = require("../assets/hand-right-paper.png")
    }

    return (
        <Image
            source={dirHand}
        />
    )
}

export default HandDisplay;