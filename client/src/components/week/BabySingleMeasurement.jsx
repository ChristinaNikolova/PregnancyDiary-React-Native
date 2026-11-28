import useThemeContext from "../../contexts/theme/useThemeContext";
import { StyleSheet, Text, View } from "react-native";
import Icon from "../shared/Icon";
import { SPACING, TYPOGRAPHY } from "../../theme";

export default function BabySingleMeasurement({
    iconName,
    measurement,
    unit
}) {
    const { theme } = useThemeContext();

    return (
        <View style={styles.container}>
            <Icon name={iconName} color={theme.colors.primary} />
            <Text style={[styles.text, { color: theme.colors.text }]}>
                Around {measurement} {unit}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.xs,
    },
    text: {
        fontFamily: TYPOGRAPHY.fontFamily.regular,
        fontSize: TYPOGRAPHY.fontSize.sm,
    }
});