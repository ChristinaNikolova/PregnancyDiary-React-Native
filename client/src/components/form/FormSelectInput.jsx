
import { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "../shared/Icon";
import ModalWrapper from "../shared/ModalWrapper";
import FormInputOption from "./FormInputOption";
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

    const handleSelect = (value) => {
        onChange(value);
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
            <ModalWrapper
                isVisible={isVisible}
                animationType="fade"
                handleClose={handleClose}
            >
                <View style={[styles.content, { top: dropdownTop }]}>
                    {options.map((option) =>
                        <FormInputOption
                            key={option.value}
                            label={option.label}
                            value={option.value}
                            selectedValue={value}
                            handleSelect={handleSelect}
                        />
                    )}
                </View>
            </ModalWrapper>
            {error
                ? <ClientError error={error} />
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
    content: {
        position: "absolute",
        left: SPACING.xl,
        right: SPACING.xl,
        padding: SPACING.md,
        backgroundColor: COLORS.background,
        borderRadius: BORDERS.radius,
    },
});
