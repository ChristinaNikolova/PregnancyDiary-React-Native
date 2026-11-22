import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Icon from "../shared/Icon";
import ClientError from "../shared/ClientError";
import FormPasswordIconInput from "./FormPasswordIconInput";
import { BORDERS, COLORS, SIZES, SPACING, TYPOGRAPHY } from "../../theme";

export default function FormInput({
    fieldName,
    placeholder,
    iconName,
    fieldHandler,
    isPassword = false,
    error,
    ...props
}) {
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPasswordPress = () => {
        setShowPassword((prev) => !prev);
    }

    return (
        <>
            <View
                style={[
                    styles.inputContainer,
                    props.multiline && styles.multilineContainer,
                ]}
            >
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
                    autoCorrect={false}
                    spellCheck={false}
                    submitBehavior={props.multiline ? "newline" : "submit"}
                />
                {isPassword && (
                    <FormPasswordIconInput
                        showPassword={showPassword}
                        handlePress={handleShowPasswordPress}
                    />
                )}
            </View>
            {error ?
                <ClientError error={error} />
                : null}
        </>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.md,
        height: 50,
        paddingHorizontal: SPACING.lg,
        borderWidth: BORDERS.width.thin,
        borderColor: COLORS.border,
        borderRadius: BORDERS.radius.xxl,
    },
    multilineContainer: {
        alignItems: "flex-start",
        height: 120,
        paddingVertical: SPACING.md,
    },
    input: {
        flex: 1,
        paddingVertical: 0,
        fontFamily: TYPOGRAPHY.fontFamily.regular,
        fontSize: TYPOGRAPHY.fontSize.sm,
        color: COLORS.text,
    },
});