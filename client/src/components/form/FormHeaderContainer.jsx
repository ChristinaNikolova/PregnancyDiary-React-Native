import { StyleSheet, Text, View } from "react-native";
import Icon from "../shared/Icon";
import useThemeContext from "../../contexts/theme/useThemeContext";
import { SIZES, SPACING, TYPOGRAPHY } from "../../theme";

export default function FormHeaderContainer({ title, subTitle }) {
    const { theme } = useThemeContext();

    return (
        <View style={styles.header}>
            <Icon
                name="heart-outline"
                size={SIZES.iconHuge}
                color={theme.colors.primary}
            />
            <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
            <Text style={[styles.subtitle, { color: theme.colors.textSecondary, }]}>{subTitle}</Text>
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
        textAlign: "center",
    },
    subtitle: {
        fontFamily: TYPOGRAPHY.fontFamily.regular,
        fontSize: TYPOGRAPHY.fontSize.sm,
        lineHeight: TYPOGRAPHY.lineHeight.md,
        textAlign: "center",
    },
});