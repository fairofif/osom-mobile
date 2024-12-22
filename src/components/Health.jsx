import { FlatList, StyleSheet, Image } from "react-native"

const Health = ({
    count
}) => {
    const healthIcon = require("../assets/icon_heart.png");

    const healthArray = Array.from({ length: count });

    return (
        <FlatList
            data={healthArray}
            horizontal
            renderItem={({ index }) => (
                <Image key={index} source={healthIcon} style={styles.heartIcon} />
            )}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.container}
            showsHorizontalScrollIndicator={false}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    heartIcon: {
        width: 20,
        height: 20,
        marginHorizontal: 1,
    },
})

export default Health