import useThemeContext from "../../contexts/theme/useThemeContext";
import { StyleSheet, Text, View } from "react-native";
import Icon from "../shared/Icon";
import { BORDERS, SIZES, SPACING, TYPOGRAPHY } from "../../theme";

export default function SingleMeasurement({
    label,
    iconName,
    measurement,
    unit
}) {
    const { theme } = useThemeContext();

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Icon
                name={iconName}
                color={theme.colors.primary}
                size={SIZES.iconDefault}
            />
            <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
                {label}
            </Text>
            <Text style={[styles.value, { color: theme.colors.text }]}>
                {measurement || "Add"} {measurement ? unit : ""}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: SPACING.sm,
        paddingVertical: SPACING.lg,
        paddingHorizontal: SPACING.sm,
        borderRadius: BORDERS.radius.lg,
    },
    label: {
        fontFamily: TYPOGRAPHY.fontFamily.regular,
        fontSize: TYPOGRAPHY.fontSize.xs,
        textAlign: "center",
    },
    value: {
        fontFamily: TYPOGRAPHY.fontFamily.bold,
        fontSize: TYPOGRAPHY.fontSize.lg,
    },
});