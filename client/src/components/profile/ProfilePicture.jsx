import { Image, StyleSheet, View } from "react-native";
import EditRoundButton from "./EditRoundButton";
import { BORDERS, COLORS, SPACING } from "../../theme";

export default function ProfilePicture({
    image,
    iconName,
    iconColor,
    iconSize,
    handlePress,
}) {
    return (
        <View style={styles.container}>
            <Image
                source={image}
                style={styles.picture}
            />
            <EditRoundButton
                iconName={iconName}
                iconColor={iconColor}
                iconSize={iconSize}
                handlePress={handlePress}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        marginBottom: SPACING.sm,
    },
    picture: {
        width: 120,
        height: 120,
        borderRadius: BORDERS.radius.round,
        backgroundColor: COLORS.border,
    },
});