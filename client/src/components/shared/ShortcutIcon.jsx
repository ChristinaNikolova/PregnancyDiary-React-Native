import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "./Icon";
import { triggerHaptic } from "../../utils/native-helpers/haptics";
import { BORDERS, COLORS, EFFECTS, SIZES, SPACING, TYPOGRAPHY } from "../../theme";

export default function ShortcutIcon({ title, iconName, handlePress }) {
    const handleHapticsPress = () => {
        triggerHaptic();
        handlePress?.();
    }
    return (
        <Pressable
            style={({ pressed }) => [
                styles.shortcut,
                pressed && {
                    opacity: EFFECTS.opacity,
                    transform: [{ scale: EFFECTS.scale }],
                },
            ]}
            onPress={handleHapticsPress}
        >
            <View style={styles.shortcutIconContainer}>
                <Icon
                    name={iconName}
                    size={SIZES.iconXLarge}
                    color={COLORS.brown}
                />
            </View>
            <Text style={styles.shortcutTitle}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    shortcut: {
        flex: 1,
        alignItems: 'center',
    },
    shortcutIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 80,
        marginBottom: SPACING.sm,
        borderRadius: BORDERS.radius.xxl,
        backgroundColor: COLORS.secondary,
    },
    shortcutTitle: {
        fontFamily: TYPOGRAPHY.fontFamily.semiBold,
        fontSize: TYPOGRAPHY.fontSize.sm,
        color: COLORS.text,
        textAlign: 'center',
    },
});