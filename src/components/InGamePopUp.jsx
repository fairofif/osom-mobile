import { useEffect } from "react";
import { StyleSheet, Image, Text, View } from "react-native"

const InGamePopUp = ({
    addedHealth,
    addedScore,
    source = null
}) => {
    return (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image
                source={source}
                style={styles.popupImage}
            />
            <Text style={styles.popupText}>
                {
                addedHealth != 0 &&
                    addedHealth < 0
                    ? `${addedHealth} Health`
                    : addedHealth > 0
                    && `+${addedHealth} Health`

            }
            </Text>
            <Text style={styles.popupText}>
                {
                    addedScore != 0 &&
                        addedScore < 0
                        ? `${addedScore} Score`
                        : addedScore > 0
                        && `+${addedScore} Score`
            }
            </Text>
        </View>
    )

}

const styles = StyleSheet.create({
    popupImage: {
        width: 200,
        height: 200,
        resizeMode: 'contain'
    },
    popupText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "black",
    },
})

export default InGamePopUp