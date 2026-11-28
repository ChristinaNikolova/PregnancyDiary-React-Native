import { useNavigation } from "@react-navigation/native";
import useFetch from "../../hooks/useFetch";
import useThemeContext from "../../contexts/theme/useThemeContext";
import { StyleSheet, Text, View } from "react-native";
import Icon from "../shared/Icon";
import JumboWrapper from "./JumboWrapper";
import { getGenderLabel } from "../../utils/helpers/gender";
import { apiPaths } from "../../utils/constants/api";
import { getCurrentWeek } from "../../utils/helpers/pregnancy";
import { SIZES, SPACING, TYPOGRAPHY } from "../../theme";

export default function JumboDiary({
    id,
    title,
    dueDate,
    gender,
}) {
    const navigation = useNavigation();
    const { theme } = useThemeContext();

    const currentWeek = getCurrentWeek(dueDate);
    const { values: currentWeekId, loading } = useFetch(`${apiPaths.DIARIES}/${id}/${currentWeek}`);

    const handlePress = () => {
        navigation.navigate("WeeksNavigator", {
            screen: "WeekDetails",
            params: {
                id: currentWeekId
            },
        });
    };

    return (
        <JumboWrapper
            title={title}
            buttonText="Open Diary"
            handlePress={handlePress}
        >
            <View style={[styles.divider, { backgroundColor: theme.colors.border, }]} />
            <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                    <Icon
                        name="calendar-outline"
                        size={SIZES.iconLarge}
                        color={theme.colors.primary}
                    />
                    <View style={styles.infoTextContainer}>
                        <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>Due date:</Text>
                        <Text style={[styles.infoValue, { color: theme.colors.text }]}>{dueDate}</Text>
                    </View>
                </View>
                <View style={styles.infoRow}>
                    <Icon
                        name="transgender-outline"
                        size={SIZES.iconLarge}
                        color={theme.colors.primary}
                    />
                    <View style={styles.infoTextContainer}>
                        <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>Baby's gender:</Text>
                        <Text style={[styles.infoValue, { color: theme.colors.text }]}>
                            {getGenderLabel(gender)}
                        </Text>
                    </View>
                </View>
            </View>
        </JumboWrapper>
    );
}

const styles = StyleSheet.create({
    divider: {
        height: 1,
        marginBottom: SPACING.sm,
    },
    infoContainer: {
        gap: SPACING.md,
        marginBottom: SPACING.lg,
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.md,
    },
    infoTextContainer: {
        flex: 1,
        gap: SPACING.xs,
    },
    infoLabel: {
        fontFamily: TYPOGRAPHY.fontFamily.regular,
        fontSize: TYPOGRAPHY.fontSize.sm,
    },
    infoValue: {
        fontFamily: TYPOGRAPHY.fontFamily.semiBold,
        fontSize: TYPOGRAPHY.fontSize.md,
    },
});