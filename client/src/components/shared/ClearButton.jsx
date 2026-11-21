import { StyleSheet, Text, View } from "react-native";
import PressableIcon from "./PressableIcon";
import { BORDERS, COLORS, SPACING, TYPOGRAPHY } from "../../theme";

export default function ClearButton({ handlePress }) {
    return (
        <View style={styles.row}>
            <Text style={styles.text}>Favourite articles</Text>
            <PressableIcon
                iconName="close-circle-outline"
                handlePress={handlePress}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        gap: SPACING.sm,
        marginBottom: SPACING.xl,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderWidth: BORDERS.width.thin,
        borderColor: COLORS.border,
        borderRadius: BORDERS.radius.round,
    },
    text: {
        fontFamily: TYPOGRAPHY.fontFamily.medium,
        fontSize: TYPOGRAPHY.fontSize.sm,
        color: COLORS.textSecondary,
    },
    clearButton: {
        marginLeft: SPACING.xs,
        padding: SPACING.xs,
    },
});