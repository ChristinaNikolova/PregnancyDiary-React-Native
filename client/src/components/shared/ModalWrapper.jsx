import { Modal, Pressable, StyleSheet, View } from "react-native";
import { COLORS } from "../../theme";

export default function ModalWrapper({
    isVisible,
    animationType,
    handleClose,
    children,
}) {
    return (
        <Modal
            visible={isVisible}
            transparent
            animationType={animationType}
            onRequestClose={handleClose}
        >
            <View style={styles.overlay}>
                <Pressable
                    style={StyleSheet.absoluteFill}
                    onPress={handleClose}
                />
                <View style={styles.content}>
                    {children}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: COLORS.greyBackground,
    },
    content: {
        zIndex: 1,
    },
});
