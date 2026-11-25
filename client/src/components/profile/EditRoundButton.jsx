import { StyleSheet, View } from "react-native";
import PressableIcon from "../shared/PressableIcon";
import { BORDERS, COLORS } from "../../theme";

export default function EditRoundButton({
    iconName,
    iconSize,
    iconColor,
    handlePress
}) {
    return (
        <View style={styles.button}>
            <PressableIcon
                iconName={iconName}
                iconSize={iconSize}
                iconColor={iconColor}
                handlePress={handlePress}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        right: 0,
        bottom: 0,
        width: 36,
        height: 36,
        borderRadius: BORDERS.radius.round,
        backgroundColor: COLORS.primary,
    },
});
