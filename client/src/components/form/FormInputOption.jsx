import { Pressable, StyleSheet, Text } from "react-native";
import Icon from "../shared/Icon";
import { COLORS, SIZES, SPACING, TYPOGRAPHY } from "../../theme";

export default function FormInputOption({
    label,
    value,
    selectedValue,
    handleSelect
}) {
    return (
        <Pressable
            style={styles.option}
            onPress={() => handleSelect(value)}
        >
            <Text style={styles.optionText}>{label}</Text>
            {selectedValue === value && (
                <Icon
                    name="checkmark"
                    size={SIZES.iconSmall}
                    color={COLORS.primary}
                />
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    option: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: SPACING.lg,
    },
    optionText: {
        fontFamily: TYPOGRAPHY.fontFamily.regular,
        fontSize: TYPOGRAPHY.fontSize.md,
        color: COLORS.text,
    },
});
