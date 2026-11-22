
import { useState } from "react";
import {
    Modal,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "../shared/Icon";
import ClientError from "../shared/ClientError";
import {
    BORDERS,
    COLORS,
    SIZES,
    SPACING,
    TYPOGRAPHY,
} from "../../theme";

function parseDate(value) {
    if (!value) return new Date();

    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day);
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

export default function FormDatePickerInput({
    fieldName,
    fieldHandler,
    label,
    placeholder = "Select date",
    error,
    minimumDate,
    maximumDate,
}) {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const { value, onChange, onBlur } = fieldHandler(fieldName);

    const openPicker = () => {
        setSelectedDate(parseDate(value));
        setIsVisible(true);
    };

    const handleChange = (event, date) => {
        if (event.type === "dismissed") {
            setIsVisible(false);
            return;
        }

        if (!date) return;

        if (Platform.OS === "android") {
            onChange(formatDate(date));
            onBlur();
            setIsVisible(false);
        } else {
            setSelectedDate(date);
        }
    };

    const confirmDate = () => {
        onChange(formatDate(selectedDate));
        onBlur();
        setIsVisible(false);
    };

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}

            <Pressable
                style={styles.inputContainer}
                onPress={openPicker}
            >
                <Icon
                    name="calendar-outline"
                    size={SIZES.iconSmall}
                    color={COLORS.textSecondary}
                />

                <Text style={value ? styles.value : styles.placeholder}>
                    {value
                        ? parseDate(value).toLocaleDateString("de-DE")
                        : placeholder}
                </Text>
            </Pressable>

            {Platform.OS === "android" && isVisible && (
                <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display="default"
                    onChange={handleChange}
                    minimumDate={minimumDate}
                    maximumDate={maximumDate}
                />
            )}

            {Platform.OS === "ios" && (
                <Modal
                    visible={isVisible}
                    transparent
                    animationType="slide"
                    onRequestClose={() => setIsVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <Pressable onPress={() => setIsVisible(false)}>
                                    <Text style={styles.action}>Cancel</Text>
                                </Pressable>

                                <Text style={styles.modalTitle}>
                                    {label || "Select date"}
                                </Text>

                                <Pressable onPress={confirmDate}>
                                    <Text style={styles.action}>Done</Text>
                                </Pressable>
                            </View>

                            <DateTimePicker
                                value={selectedDate}
                                mode="date"
                                display="spinner"
                                onChange={handleChange}
                                minimumDate={minimumDate}
                                maximumDate={maximumDate}
                            />
                        </View>
                    </View>
                </Modal>
            )}

            {error ? <ClientError error={error} /> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: SPACING.xs,
    },
    label: {
        fontFamily: TYPOGRAPHY.fontFamily.semiBold,
        fontSize: TYPOGRAPHY.fontSize.sm,
        color: COLORS.text,
    },
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
    modalOverlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.35)",
    },
    modalContent: {
        backgroundColor: COLORS.background,
        borderTopLeftRadius: BORDERS.radius.xxl,
        borderTopRightRadius: BORDERS.radius.xxl,
        paddingBottom: SPACING.xl,
        alignItems: "center",
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: SPACING.lg,
    },
    modalTitle: {
        fontFamily: TYPOGRAPHY.fontFamily.semiBold,
        fontSize: TYPOGRAPHY.fontSize.md,
        color: COLORS.text,
    },
    action: {
        fontFamily: TYPOGRAPHY.fontFamily.semiBold,
        fontSize: TYPOGRAPHY.fontSize.sm,
        color: COLORS.primary,
    },
});
