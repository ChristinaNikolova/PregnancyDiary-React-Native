import { Pressable, StyleSheet } from "react-native";
import Icon from "../shared/Icon";
import useThemeContext from "../../contexts/theme/useThemeContext";
import { hitSlop } from "../../utils/constants/global";
import { SIZES } from "../../theme";

export default function FormPasswordIconInput({ showPassword, handlePress }) {
    const { theme } = useThemeContext();

    return (
        <Pressable
            onPress={handlePress}
            hitSlop={hitSlop.DEFAULT}
            style={styles.passwordToggle}
        >
            <Icon
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={SIZES.iconMedium}
                color={theme.colors.textSecondary}
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