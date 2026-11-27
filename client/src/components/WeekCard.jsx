import { Pressable, View, Image, StyleSheet } from "react-native";
import useThemeContext from "../contexts/theme/useThemeContext";
import { getWeekImage } from "../utils/helpers/image";
import { triggerHaptic } from "../utils/native-helpers/haptics";
import { EFFECTS, BORDERS } from "../theme";

export default function WeekCard({
    id,
    title,
    disabled
}) {
    const { theme } = useThemeContext();
    const image = getWeekImage(title);

    const handlePress = () => {
        triggerHaptic();
        console.log('id', id)
    }

    return (
        <Pressable
            style={({ pressed }) => [
                styles.container,
                {
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.border,
                },
                pressed && {
                    opacity: EFFECTS.opacity,
                    transform: [{ scale: EFFECTS.scale }],
                },
            ]}
            disabled={disabled}
            onPress={handlePress}
        >
            {disabled && <View style={[styles.disabledOverlay, { backgroundColor: theme.colors.whiteBackground }]} />}
            <View style={[styles.week, { backgroundColor: theme.colors.secondary, }]}>
                <Image
                    source={image}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "31.5%",
        overflow: "hidden",
        borderRadius: BORDERS.radius.huge,
        borderWidth: BORDERS.width.thin,
    },
    disabledOverlay: {
        ...StyleSheet.absoluteFill,
        zIndex: 1,
    },
    week: {
        width: "100%",
        aspectRatio: 1,
    },
    image: {
        width: "100%",
        height: "100%",
    },
});
