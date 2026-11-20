import { StyleSheet, View } from "react-native";
import { BORDERS, COLORS, SPACING, TYPOGRAPHY } from "../../theme";

export default function ServerError({ error }) {
    return (
        <View style={styles.errorContainer}>
            <Text style={styles.error}>{error}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    errorContainer: {
        backgroundColor: COLORS.softError,
        borderWidth: BORDERS.width.thin,
        borderColor: COLORS.error,
        borderRadius: BORDERS.radius.md,
        padding: SPACING.md,
        marginTop: SPACING.sm,
        marginBottom: SPACING.md,
    },
    error: {
        color: COLORS.error,
        fontFamily: TYPOGRAPHY.fontFamily.medium,
        fontSize: TYPOGRAPHY.fontSize.sm,
        lineHeight: TYPOGRAPHY.lineHeight.sm,
    },
});