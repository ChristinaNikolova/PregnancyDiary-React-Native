import useThemeContext from "../../contexts/theme/useThemeContext";
import { Pressable, StyleSheet } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import Icon from "./Icon";
import { BORDERS, SIZES, SPACING } from "../../theme";

export default function SwipeableAction({ progress, handlePress }) {
    const { theme } = useThemeContext();

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: progress.value,
    }));

    return (
        <Animated.View
            style={[styles.container, animatedStyle, { backgroundColor: theme.colors.primary }]}
        >
            <Pressable style={styles.content} onPress={handlePress}>
                <Icon
                    name="pencil"
                    color={theme.colors.white}
                    size={SIZES.iconDefault}
                />
            </Pressable>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 75,
        marginLeft: SPACING.sm,
        overflow: "hidden",
        borderRadius: BORDERS.radius.lg,
    },
    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});