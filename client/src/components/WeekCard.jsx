import { Pressable, View, Image, StyleSheet } from "react-native";
import { getWeekImage } from "../utils/helpers/image";
import { triggerHaptic } from "../utils/native-helpers/haptics";
import { COLORS, EFFECTS, BORDERS } from "../theme";

export default function WeekCard({
    id,
    title,
    disabled
}) {
    const image = getWeekImage(title);

    const handlePress = () => {
        triggerHaptic();
        console.log('id', id)
    }

    return (
        <Pressable style={({ pressed }) => [
            styles.container,
            pressed && {
                opacity: EFFECTS.opacity,
                transform: [{ scale: EFFECTS.scale }],
            },
        ]}
            disabled={disabled}
            onPress={handlePress}
        >
            {disabled && <View style={styles.disabledOverlay} />}
            <View style={styles.week}>
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
        backgroundColor: COLORS.surface,
        borderRadius: BORDERS.radius.huge,
        borderWidth: BORDERS.width.thin,
        borderColor: COLORS.border,
    },
    disabledOverlay: {
        ...StyleSheet.absoluteFill,
        zIndex: 1,
        backgroundColor: COLORS.whiteBackground,
    },
    week: {
        width: "100%",
        aspectRatio: 1,
        backgroundColor: COLORS.secondary,
    },
    image: {
        width: "100%",
        height: "100%",
    },
});
