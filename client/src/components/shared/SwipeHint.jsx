import { StyleSheet, Text, View } from "react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "../../theme";

export default function SwipeHint({
    text,
    current,
    length,
}) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
            <Text style={styles.indicator}>
                {current} of {length}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        gap: SPACING.xs,
        paddingTop: SPACING.md,
    },
    text: {
        fontFamily: TYPOGRAPHY.fontFamily.regular,
        fontSize: TYPOGRAPHY.fontSize.xs,
        color: COLORS.textSecondary,
    },
    indicator: {
        fontFamily: TYPOGRAPHY.fontFamily.medium,
        fontSize: TYPOGRAPHY.fontSize.xs,
        color: COLORS.primary,
    },
});
