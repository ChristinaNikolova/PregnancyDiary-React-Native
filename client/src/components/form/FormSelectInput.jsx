
import { useRef, useState } from "react";
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
    const inputRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [dropdownTop, setDropdownTop] = useState(0);

    const { value, onChange, onBlur } = fieldHandler(fieldName);

    const selectedOption = options.find(
        (option) => option.value === value
    );

    const handleOpen = () => {
        inputRef.current?.measureInWindow((x, y, width, height) => {
            setDropdownTop(y + height + SPACING.sm);
            setIsVisible(true);
        });
    };

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
                ref={inputRef}
                style={styles.inputContainer}
                onPress={handleOpen}
            >
                <Icon
                    name={iconName}
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
                <View style={styles.overlay}>
                    <Pressable
                        style={StyleSheet.absoluteFill}
                        onPress={handleClose}
                    />

                    <View style={[styles.modalContent, { top: dropdownTop }]}>
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
                </View>
            </Modal>

            {error ? <ClientError error={error} /> : null}
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
        backgroundColor: COLORS.greyBackground,
    },
    modalContent: {
        position: "absolute",
        left: SPACING.xl,
        right: SPACING.xl,
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
