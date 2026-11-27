import { Pressable, StyleSheet, View, Text } from "react-native";
import DateTimePickerContainer from "./DateTimePickerContainer";
import ModalWrapper from "../shared/ModalWrapper";
import { BORDERS, COLORS, SPACING, TYPOGRAPHY } from "../../theme";

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
    return (
        <ModalWrapper
            visible={isVisible}
            animationType="slide"
            overlayStyle={{ justifyContent: "flex-end" }}
            handleClose={handleClose}
        >
            <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                    <Pressable
                        onPress={handleClose}
                    >
                        <Text style={styles.action}>Cancel</Text>
                    </Pressable>
                    <Pressable onPress={handleConfirm}>
                        <Text style={styles.action}>Done</Text>
                    </Pressable>
                </View>
                <DateTimePickerContainer
                    value={selectedDate}
                    mode={mode}
                    display="spinner"
                    minimumDate={minimumDate}
                    maximumDate={maximumDate}
                    handleChange={handleChange}
                />
            </View>
        </ModalWrapper>
    );
}

const styles = StyleSheet.create({
    modalContent: {
        alignItems: "center",
        paddingBottom: SPACING.xl,
        backgroundColor: COLORS.background,
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
        color: COLORS.primary,
    },
});
