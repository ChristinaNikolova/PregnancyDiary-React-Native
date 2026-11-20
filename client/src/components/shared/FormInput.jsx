import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Icon from "./Icon";
import FormInputPasswordIcon from "./FormInputPasswordIcon";
import { BORDERS, COLORS, SIZES, SPACING, TYPOGRAPHY } from "../../theme";

export default function FormInput({
    fieldName,
    placeholder,
    iconName,
    fieldHandler,
    isPassword = false,
    ...props
}) {
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPasswordPress = () => {
        setShowPassword((prev) => !prev)
    }

    return (
        <View style={styles.inputContainer}>
            {iconName && (
                <Icon
                    name={iconName}
                    size={SIZES.iconSmall}
                    color={COLORS.textSecondary}
                />
            )}
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor={COLORS.textSecondary}
                secureTextEntry={isPassword && !showPassword}
                {...fieldHandler(fieldName)}
                {...props}
            />
            {isPassword && (
                <FormInputPasswordIcon
                    showPassword={showPassword}
                    handlePress={handleShowPasswordPress}
                />
            )}
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