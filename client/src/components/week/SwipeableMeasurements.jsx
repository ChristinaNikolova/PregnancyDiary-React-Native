import useThemeContext from "../../contexts/theme/useThemeContext";
import { StyleSheet, View } from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import SingleMeasurement from "./SingleMeasurement";
import { BORDERS, SPACING } from "../../theme";
import SwipeableAction from "../shared/SwipeableAction";
import useSwipeable from "../../hooks/useSwipeable";

export default function SwipeableMeasurements({
    weight,
    bellySize,
    handlePress
}) {
    const { theme } = useThemeContext();
    const swipeProps = useSwipeable();

    const renderRightActions = (progress) => (
        <SwipeableAction
            progress={progress}
            handlePress={handlePress}
        />
    );

    return (
        <ReanimatedSwipeable
            renderRightActions={renderRightActions}
            {...swipeProps}
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
});