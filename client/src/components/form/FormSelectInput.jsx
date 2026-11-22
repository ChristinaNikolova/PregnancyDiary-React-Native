
import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "../shared/Icon";
import ClientError from "../shared/ClientError";
import { BORDERS, COLORS, SIZES, SPACING, TYPOGRAPHY } from "../../theme";

export default function FormSelectInput({
    fieldName,
    placeholder,
    iconName,
    fieldHandler,
    error,
    options,
}) {
    const [isVisible, setIsVisible] = useState(false);

    const { value, onChange, onBlur } = fieldHandler(fieldName);

    const selectedOption = options.find(
        (option) => option.value === value
    );

    const handleSelect = (option) => {
        onChange(option.value);
        onBlur();
        setIsVisible(false);
    };

    const handleClose = () => {
        onBlur();
        setIsVisible(false);
    };

    return (
        <>
            <Pressable
                style={styles.inputContainer}
                onPress={() => setIsVisible(true)}
            >
                <Icon
                    name="transgender-outline"
                    size={SIZES.iconSmall}
                    color={COLORS.textSecondary}
                />

                <Text style={selectedOption ? styles.value : styles.placeholder}>
                    {selectedOption?.label || placeholder}
                </Text>

                <Icon
                    name="chevron-down-outline"
                    size={SIZES.iconSmall}
                    color={COLORS.textSecondary}
                />
            </Pressable>

            <Modal
                visible={isVisible}
                transparent
                animationType="fade"
                onRequestClose={handleClose}
            >
                <Pressable
                    style={styles.overlay}
                    onPress={handleClose}
                >
                    <View style={styles.modalContent}>
                        {options.map((option) => (
                            <Pressable
                                key={option.value}
                                style={styles.option}
                                onPress={() => handleSelect(option)}
                            >
                                <Text style={styles.optionText}>
                                    {option.label}
                                </Text>

                                {value === option.value && (
                                    <Icon
                                        name="checkmark"
                                        size={SIZES.iconSmall}
                                        color={COLORS.primary}
                                    />
                                )}
                            </Pressable>
                        ))}
                    </View>
                </Pressable>
            </Modal>
            {error ?
                <ClientError error={error} />
                : null
            }
        </>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.md,
        padding: SPACING.lg,
        borderWidth: BORDERS.width.thin,
        borderColor: COLORS.border,
        borderRadius: BORDERS.radius.xxl,
    },
    placeholder: {
        flex: 1,
        fontFamily: TYPOGRAPHY.fontFamily.regular,
        fontSize: TYPOGRAPHY.fontSize.sm,
        color: COLORS.textSecondary,
    },
    value: {
        flex: 1,
        fontFamily: TYPOGRAPHY.fontFamily.regular,
        fontSize: TYPOGRAPHY.fontSize.md,
        color: COLORS.text,
    },
    overlay: {
        flex: 1,
        justifyContent: "center",
        padding: SPACING.xl,
        backgroundColor: COLORS.greyBackground,
    },
    modalContent: {
        padding: SPACING.md,
        backgroundColor: COLORS.background,
        borderRadius: BORDERS.radius,
    },
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
