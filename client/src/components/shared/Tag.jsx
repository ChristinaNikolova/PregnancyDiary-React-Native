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
        minHeight: 30,
        alignSelf: "flex-start",
        justifyContent: "center",
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.sm,
        borderRadius: 20,
        backgroundColor: COLORS.secondary,
    },
    tagText: {
        color: COLORS.text,
        fontSize: TYPOGRAPHY.fontSize.xs,
        fontWeight: "600",
    },
});