import { StyleSheet, Text } from "react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "../../theme";

export default function ClientError({ error }) {
    return (
        <Text style={styles.error}>{error}</Text>
    );
}

const styles = StyleSheet.create({
    error: {
        marginTop: SPACING.xs,
        marginLeft: SPACING.sm,
        fontFamily: TYPOGRAPHY.fontFamily.regular,
        fontSize: TYPOGRAPHY.fontSize.xs,
        color: COLORS.error,
    },
});