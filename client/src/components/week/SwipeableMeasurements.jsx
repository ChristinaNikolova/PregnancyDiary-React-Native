import useThemeContext from "../../contexts/theme/useThemeContext";
import { Pressable, StyleSheet, View } from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import SingleMeasurement from "./SingleMeasurement";
import Icon from "../shared/Icon";
import { BORDERS, SIZES, SPACING } from "../../theme";

export default function SwipeableMeasurements({
    weight,
    bellySize,
    handlePress
}) {
    const { theme } = useThemeContext();

    const renderRightActions = () => (
        <Pressable
            style={[styles.button, { backgroundColor: theme.colors.primary }]}
            onPress={handlePress}
        >
            <Icon name="pencil" color={theme.colors.white} size={SIZES.iconDefault} />
        </Pressable>
    );

    return (
        <ReanimatedSwipeable
            renderRightActions={renderRightActions}
            overshootRight={false}
        >
            <View style={[styles.section, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
                <View style={styles.row}>
                    <SingleMeasurement
                        iconName="scale-outline"
                        label="My weight"
                        measurement={weight}
                        unit="kg"
                    />
                    <SingleMeasurement
                        iconName="resize-outline"
                        label="Belly size"
                        measurement={bellySize}
                        unit="cm"
                    />
                </View>
            </View>
        </ReanimatedSwipeable>
    );
}

const styles = StyleSheet.create({
    section: {
        padding: SPACING.lg,
        borderWidth: BORDERS.width.thin,
        borderRadius: BORDERS.radius.xl,
    },
    row: {
        flexDirection: "row",
        gap: SPACING.md,
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        gap: SPACING.xs,
        width: 75,
        marginLeft: SPACING.sm,
        borderRadius: BORDERS.radius.lg,
    },
});