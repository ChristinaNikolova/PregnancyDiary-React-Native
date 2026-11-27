import { Pressable, StyleSheet, Text } from "react-native";
import useThemeContext from "../../contexts/theme/useThemeContext";
import { triggerHaptic } from "../../utils/native-helpers/haptics";
import { BORDERS, EFFECTS, SPACING, TYPOGRAPHY } from "../../theme";

export default function PrimaryButton({ buttonText, disabled = false, handlePress }) {
    const { theme } = useThemeContext();

    const handleHapticsPress = () => {
        triggerHaptic();
        handlePress?.();
    }

    return (
        <Pressable
            disabled={disabled}
            style={({ pressed }) => [
                styles.button,
                { backgroundColor: theme.colors.primary },
                pressed && !disabled && {
                    opacity: EFFECTS.opacity,
                    transform: [{ scale: EFFECTS.scale }],
                },
                disabled && styles.disabledButton,
            ]}
            onPress={handleHapticsPress}
        >
            <Text style={[styles.buttonText, { color: theme.colors.white, }]}>{buttonText}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        width: "70%",
        paddingVertical: SPACING.lg,
        paddingHorizontal: SPACING.xxl,
        borderRadius: BORDERS.radius.round,
    },
    buttonText: {
        fontFamily: TYPOGRAPHY.fontFamily.medium,
        fontSize: TYPOGRAPHY.fontSize.md,
        textTransform: "capitalize",
    },
    disabledButton: {
        opacity: EFFECTS.disabledOpacity,
    },
});