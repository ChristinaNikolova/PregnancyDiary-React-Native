import { StyleSheet, View } from "react-native";
import PressableIcon from "../shared/PressableIcon";
import useThemeContext from "../../contexts/theme/useThemeContext";
import { BORDERS } from "../../theme";

export default function EditRoundButton({
    iconName,
    iconSize,
    iconColor,
    handlePress
}) {
    const { theme } = useThemeContext();

    return (
        <View style={[styles.button, { backgroundColor: theme.colors.primary }]}>
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
    },
});
