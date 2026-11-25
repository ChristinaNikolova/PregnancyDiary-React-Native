import { StyleSheet, Text, View } from "react-native";
import Icon from "../shared/Icon";
import { COLORS, SIZES, SPACING, TYPOGRAPHY } from "../../theme";

export default function BabyProfileRow({ iconName, label, value }) {
    return (
        <View style={styles.row}>
            <Icon
                name={iconName}
                size={SIZES.iconMedium}
                color={COLORS.primary}
            />
            <View style={styles.info}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.value}>{value}</Text>
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
        color: COLORS.text,
    },
    value: {
        fontFamily: TYPOGRAPHY.fontFamily.regular,
        fontSize: TYPOGRAPHY.fontSize.sm,
        color: COLORS.text,
    },
});
