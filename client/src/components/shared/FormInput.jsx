import { StyleSheet, TextInput, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { BORDERS, COLORS, SPACING, TYPOGRAPHY } from "../../theme";

export default function FormInput({
    fieldName,
    placeholder,
    iconName,
    fieldHandler,
    ...props
}) {
    return (
        <View style={styles.inputContainer}>
            {iconName && (
                <Feather
                    name={iconName}
                    size={SPACING.lg}
                    color={COLORS.textSecondary}
                />
            )}
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor={COLORS.textSecondary}
                {...fieldHandler(fieldName)}
                {...props}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        height: 50,
        paddingHorizontal: SPACING.lg,
        borderWidth: BORDERS.width.thin,
        borderColor: COLORS.border,
        borderRadius: BORDERS.radius.xxl,
        gap: SPACING.md,
    },
    input: {
        flex: 1,
        fontFamily: TYPOGRAPHY.fontFamily.regular,
        fontSize: TYPOGRAPHY.fontSize.sm,
        color: COLORS.text,
        paddingVertical: 0,
    },
});