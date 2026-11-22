import { StyleSheet, Text, View } from "react-native";
import { Link } from '@react-navigation/native';
import { COLORS, SPACING, TYPOGRAPHY } from "../../theme";

export default function FormFooterContainer({ text, link }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
            <Link style={styles.link} screen={link}>
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
        color: COLORS.text,
    },
    link: {
        fontFamily: TYPOGRAPHY.fontFamily.semiBold,
        fontSize: TYPOGRAPHY.fontSize.sm,
        color: COLORS.primary,
    },
});