import { Pressable, StyleSheet, Text } from "react-native";
import { BORDERS, COLORS, EFFECTS, SPACING, TYPOGRAPHY } from "../../theme";
import { triggerHaptic } from "../../utils/native-helpers/haptics";

export default function PrimaryButton({ buttonText, disabled = false, handlePress }) {
    const handleHapticsPress = () => {
        triggerHaptic();
        handlePress?.();
    }

    return (
        <Pressable
            disabled={disabled}
            style={({ pressed }) => [
                styles.button,
                pressed && !disabled && {
                    opacity: EFFECTS.opacity,
                    transform: [{ scale: EFFECTS.scale }],
                },
                disabled && styles.disabledButton,
            ]}
            onPress={handleHapticsPress}
        >
            <Text style={styles.buttonText}>{buttonText}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        width: "70%",
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING.lg,
        paddingHorizontal: SPACING.xxl,
        borderRadius: BORDERS.radius.round,
    },
    buttonText: {
        fontFamily: TYPOGRAPHY.fontFamily.medium,
        fontSize: TYPOGRAPHY.fontSize.md,
        color: COLORS.white,
    },
    disabledButton: {
        opacity: EFFECTS.disabledOpacity,
    },
});