import { StyleSheet, Text, View } from "react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "../../theme";

export default function Tag({ text }) {
    return (
        <View style={styles.tagWrapper}>
            <Text style={styles.tagText}>
                {text}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    tagWrapper: {
        backgroundColor: COLORS.secondary,
        paddingHorizontal: SPACING.base,
        paddingVertical: SPACING.sm,
        borderRadius: 20,
    },
    tagText: {
        color: COLORS.text,
        fontSize: TYPOGRAPHY.fontSize.xs,
        fontWeight: "600",
    },
});