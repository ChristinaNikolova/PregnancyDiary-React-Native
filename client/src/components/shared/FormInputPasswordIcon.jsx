import { Pressable, StyleSheet } from "react-native";
import Icon from "./Icon";
import { COLORS, SIZES } from "../../theme";

export default function FormInputPasswordIcon({ showPassword, handlePress }) {
    return (
        <Pressable
            onPress={handlePress}
            hitSlop={10}
            style={styles.passwordToggle}
        >
            <Icon
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={SIZES.iconMedium}
                color={COLORS.textSecondary}
            />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    passwordToggle: {
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
    },
});