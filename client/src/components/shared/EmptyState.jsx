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
        justifyContent: "start",
        alignItems: "center",
    },
    emptyText: {
        fontSize: TYPOGRAPHY.fontSize.md,
        textAlign: "center",
        fontWeight: 700,
        color: COLORS.textSecondary,
    },
});