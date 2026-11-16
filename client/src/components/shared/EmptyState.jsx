import { StyleSheet, View, Text } from "react-native";
import { TYPOGRAPHY, COLORS } from "../../theme";

export default function EmptyState({ text }) {
    return (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    emptyText: {
        fontFamily: TYPOGRAPHY.fontFamily.bold,
        fontSize: TYPOGRAPHY.fontSize.md,
        color: COLORS.textSecondary,
        textAlign: "center",
    },
});