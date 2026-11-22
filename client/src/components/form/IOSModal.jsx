import { Modal, Pressable, StyleSheet, View, Text } from "react-native";
import DatePicker from "./DatePicker";
import { BORDERS, COLORS, SPACING, TYPOGRAPHY } from "../../theme";

export default function IOSModal({
    isVisible,
    selectedDate,
    minimumDate,
    maximumDate,
    handleChange,
    handleClose,
    handleConfirm
}) {
    return (
        <Modal
            visible={isVisible}
            transparent
            animationType="slide"
            onRequestClose={handleClose}
        >
            <View style={styles.modalOverlay}>
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
                    <DatePicker
                        value={selectedDate}
                        display="spinner"
                        minimumDate={minimumDate}
                        maximumDate={maximumDate}
                        handleChange={handleChange}
                    />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: COLORS.greyBackground,
    },
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
