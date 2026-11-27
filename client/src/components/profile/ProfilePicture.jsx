import { Image, StyleSheet, View } from "react-native";
import EditRoundButton from "./EditRoundButton";
import useThemeContext from "../../contexts/theme/useThemeContext";
import { BORDERS, SPACING } from "../../theme";

export default function ProfilePicture({
    image,
    iconName,
    iconColor,
    iconSize,
    handlePress,
}) {
    const { theme } = useThemeContext();

    return (
        <View style={styles.container}>
            <Image
                source={image}
                style={[styles.picture, { backgroundColor: theme.colors.border }]}
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
    },
});