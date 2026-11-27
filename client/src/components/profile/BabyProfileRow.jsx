import { StyleSheet, Text, View } from "react-native";
import Icon from "../shared/Icon";
import useThemeContext from "../../contexts/theme/useThemeContext";
import { SIZES, SPACING, TYPOGRAPHY } from "../../theme";

export default function BabyProfileRow({ iconName, label, value }) {
    const { theme } = useThemeContext();

    return (
        <View style={styles.row}>
            <Icon
                name={iconName}
                size={SIZES.iconMedium}
                color={theme.colors.primary}
            />
            <View style={styles.info}>
                <Text style={[styles.label, { color: theme.colors.text }]}>{label}</Text>
                <Text style={[styles.value, { color: theme.colors.text }]}>{value}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.md,
        minHeight: 64,
    },
    info: {
        flex: 1,
        gap: 2,
    },
    label: {
        fontFamily: TYPOGRAPHY.fontFamily.semiBold,
        fontSize: TYPOGRAPHY.fontSize.sm,
    },
    value: {
        fontFamily: TYPOGRAPHY.fontFamily.regular,
        fontSize: TYPOGRAPHY.fontSize.sm,
    },
});
