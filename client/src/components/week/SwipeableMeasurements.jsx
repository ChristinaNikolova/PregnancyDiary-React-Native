import useThemeContext from "../../contexts/theme/useThemeContext";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Icon from "../shared/Icon";
import { BORDERS, SPACING, TYPOGRAPHY } from "../../theme";

export default function SwipeableMeasurements({
    weight,
    bellySize,
    handlePress
}) {
    const { theme } = useThemeContext();

    const renderRightActions = () => (
        <Pressable
            style={[styles.editButton, { backgroundColor: theme.colors.primary }]}
            onPress={handlePress}
        >
            <Icon name="pencil" color={theme.colors.white} size={24} />
            <Text style={[styles.editText, { color: theme.colors.white }]}>
                Edit
            </Text>
        </Pressable>
    );

    return (
        <ReanimatedSwipeable
            renderRightActions={renderRightActions}
            overshootRight={false}
        >
            <View style={[styles.section, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
                <View style={styles.dataRow}>
                    <View style={[styles.dataCard, { backgroundColor: theme.colors.background }]}>
                        <Icon name="scale-outline" color={theme.colors.primary} size={22} />
                        <Text style={[styles.dataLabel, { color: theme.colors.textSecondary }]}>
                            My weight
                        </Text>
                        <Text style={[styles.dataValue, { color: theme.colors.text }]}>
                            {weight || "Add"} {weight ? "kg" : ""}
                        </Text>
                    </View>

                    <View style={[styles.dataCard, { backgroundColor: theme.colors.background }]}>
                        <Icon name="resize-outline" color={theme.colors.primary} size={22} />
                        <Text style={[styles.dataLabel, { color: theme.colors.textSecondary }]}>
                            Belly size
                        </Text>
                        <Text style={[styles.dataValue, { color: theme.colors.text }]}>
                            {bellySize || "Add"} {bellySize ? "cm" : ""}
                        </Text>
                    </View>
                </View>
            </View>
        </ReanimatedSwipeable>
    );
}

const styles = StyleSheet.create({
    section: {
        borderWidth: BORDERS.width.thin,
        borderRadius: BORDERS.radius.xl,
        padding: SPACING.lg,
    },
    dataRow: {
        flexDirection: "row",
        gap: SPACING.md,
    },
    dataCard: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: SPACING.sm,
        paddingVertical: SPACING.lg,
        paddingHorizontal: SPACING.sm,
        borderRadius: BORDERS.radius.lg,
    },
    dataLabel: {
        fontFamily: TYPOGRAPHY.fontFamily.regular,
        fontSize: TYPOGRAPHY.fontSize.xs,
        textAlign: "center",
    },
    dataValue: {
        fontFamily: TYPOGRAPHY.fontFamily.bold,
        fontSize: TYPOGRAPHY.fontSize.lg,
    },
    editButton: {
        width: 75,
        marginLeft: SPACING.sm,
        borderRadius: BORDERS.radius.lg,
        alignItems: "center",
        justifyContent: "center",
        gap: SPACING.xs,
    },
    editText: {
        fontFamily: TYPOGRAPHY.fontFamily.semiBold,
        fontSize: TYPOGRAPHY.fontSize.xs,
    },
});