import { StyleSheet, Text, View } from "react-native";
import Icon from "../shared/Icon";
import { COLORS, SIZES, SPACING, TYPOGRAPHY } from "../../theme";

export default function FormHeaderContainer({ title, subTitle }) {
    return (
        <View style={styles.header}>
            <Icon
                name="heart-outline"
                size={SIZES.iconHuge}
                color={COLORS.primary}
            />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subTitle}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        alignItems: "center",
        marginBottom: SPACING.xxl,
        gap: SPACING.sm,
    },
    title: {
        fontFamily: TYPOGRAPHY.fontFamily.semiBold,
        fontSize: TYPOGRAPHY.fontSize.xxl,
        lineHeight: TYPOGRAPHY.lineHeight.xxl,
        color: COLORS.text,
        textAlign: "center",
    },
    subtitle: {
        fontFamily: TYPOGRAPHY.fontFamily.regular,
        fontSize: TYPOGRAPHY.fontSize.sm,
        lineHeight: TYPOGRAPHY.lineHeight.md,
        color: COLORS.textSecondary,
        textAlign: "center",
    },
});