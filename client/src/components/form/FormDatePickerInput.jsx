
import { useState } from "react";
import { Platform, Pressable, StyleSheet, Text } from "react-native";
import Icon from "../shared/Icon";
import ClientError from "../shared/ClientError";
import DatePicker from "./DatePicker";
import IOSModal from "./IOSModal";
import { formatDate, parseDate } from "../../utils/helpers/date";
import { BORDERS, COLORS, SIZES, SPACING, TYPOGRAPHY } from "../../theme";

// todo check date after date
export default function FormDatePickerInput({
    value,
    placeholder,
    error,
    minimumDate,
    maximumDate,
    onChange,
    onBlur,
}) {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleOpen = () => {
        setSelectedDate(parseDate(value));
        setIsVisible(true);
    };

    const handleClose = () => {
        setIsVisible(false);
        onBlur?.();
    };

    const handleChange = (event, date) => {
        if (event.type === "dismissed") {
            setIsVisible(false);
            onBlur?.();
            return;
        }

        if (!date) return;

        if (Platform.OS === "android") {
            onChange(formatDate(date));
            onBlur?.();
            setIsVisible(false);
        } else {
            setSelectedDate(date);
        }
    };

    const handleConfirm = () => {
        onChange(formatDate(selectedDate));
        onBlur?.();
        setIsVisible(false);
    };

    return (
        <>
            <Pressable style={styles.inputContainer} onPress={handleOpen}>
                <Icon
                    name="calendar-outline"
                    size={SIZES.iconSmall}
                    color={COLORS.textSecondary}
                />
                <Text style={value ? styles.value : styles.placeholder}>
                    {value
                        ? new Date(`${value}T00:00:00`).toLocaleDateString("de-DE")
                        : placeholder}
                </Text>
            </Pressable>
            {Platform.OS === "android" &&
                isVisible &&
                <DatePicker
                    selectedDate={selectedDate}
                    minimumDate={minimumDate}
                    maximumDate={maximumDate}
                    handleChange={handleChange}
                />
            }
            {Platform.OS === "ios" &&
                isVisible &&
                <IOSModal
                    isVisible={isVisible}
                    selectedDate={selectedDate}
                    minimumDate={minimumDate}
                    maximumDate={maximumDate}
                    handleChange={handleChange}
                    handleClose={handleClose}
                    handleConfirm={handleConfirm}
                />
            }
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
        height: 50,
        paddingHorizontal: SPACING.lg,
        borderWidth: BORDERS.width.thin,
        borderColor: COLORS.border,
        borderRadius: BORDERS.radius.xxl,
    },
    value: {
        flex: 1,
        fontFamily: TYPOGRAPHY.fontFamily.regular,
        fontSize: TYPOGRAPHY.fontSize.sm,
        color: COLORS.text,
    },
    placeholder: {
        flex: 1,
        fontFamily: TYPOGRAPHY.fontFamily.regular,
        fontSize: TYPOGRAPHY.fontSize.sm,
        color: COLORS.textSecondary,
    },
});
