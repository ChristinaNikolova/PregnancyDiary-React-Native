import useThemeContext from "../../contexts/theme/useThemeContext";
import { Pressable, StyleSheet, View, Text } from "react-native";
import DateTimePickerContainer from "./DateTimePickerContainer";
import ModalWrapper from "../shared/ModalWrapper";
import { BORDERS, SPACING, TYPOGRAPHY } from "../../theme";

export default function IOSModal({
    isVisible,
    selectedDate,
    mode,
    minimumDate,
    maximumDate,
    handleChange,
    handleClose,
    handleConfirm
}) {
    const { theme } = useThemeContext();

    return (
        <ModalWrapper
            visible={isVisible}
            animationType="slide"
            overlayStyle={{ justifyContent: "flex-end" }}
            handleClose={handleClose}
        >
            <View style={[styles.modalContent, { backgroundColor: theme.colors.background }]}>
                <View style={styles.modalHeader}>
                    <Pressable
                        onPress={handleClose}
                    >
                        <Text style={[styles.action, { color: theme.colors.primary }]}>Cancel</Text>
                    </Pressable>
                    <Pressable onPress={handleConfirm}>
                        <Text style={[styles.action, { color: theme.colors.primary }]}>Done</Text>
                    </Pressable>
                </View>
                <DateTimePickerContainer
                    value={selectedDate}
                    mode={mode}
                    display="spinner"
                    minimumDate={minimumDate}
                    maximumDate={maximumDate}
                    handleChange={handleChange}
                    textColor={theme.colors.text}
                    themeVariant={theme.dark ? "dark" : "light"}
                />
            </View>
        </ModalWrapper>
    );
}

const styles = StyleSheet.create({
    modalContent: {
        alignItems: "center",
        paddingBottom: SPACING.xl,
        borderTopLeftRadius: BORDERS.radius.xxl,
        borderTopRightRadius: BORDERS.radius.xxl,
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        padding: SPACING.lg,
    },
    action: {
        fontFamily: TYPOGRAPHY.fontFamily.semiBold,
        fontSize: TYPOGRAPHY.fontSize.sm,
    },
});
