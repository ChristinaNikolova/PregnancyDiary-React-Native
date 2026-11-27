import { StyleSheet, Text, View } from "react-native";
import { Link } from '@react-navigation/native';
import useThemeContext from "../../contexts/theme/useThemeContext";
import { SPACING, TYPOGRAPHY } from "../../theme";

export default function FormFooterContainer({ text, link }) {
    const { theme } = useThemeContext();

    return (
        <View style={styles.container}>
            <Text style={[styles.text, { color: theme.colors.text }]}>{text}</Text>
            <Link style={[styles.link, { color: theme.colors.primary }]} screen={link}>
                {link}
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: SPACING.xs,
        marginTop: SPACING.xxl,
    },
    text: {
        fontFamily: TYPOGRAPHY.fontFamily.regular,
        fontSize: TYPOGRAPHY.fontSize.sm,
    },
    link: {
        fontFamily: TYPOGRAPHY.fontFamily.semiBold,
        fontSize: TYPOGRAPHY.fontSize.sm,
    },
});