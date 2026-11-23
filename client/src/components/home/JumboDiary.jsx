import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "../shared/Icon";
import JumboWrapper from "./JumboWrapper";
import { getGenderLabel } from "../../utils/helpers/gender";
import { COLORS, SIZES, SPACING, TYPOGRAPHY } from "../../theme";

export default function JumboDiary({
    id,
    title,
    dueDate,
    gender,
}) {
    const navigation = useNavigation();
    // todo navigate to diary details
    const handlePress = () => {
        navigation.navigate("Diary");
    };

    return (
        <JumboWrapper
            title={title}
            buttonText="Open Diary"
            handlePress={handlePress}
        >
            <View style={styles.divider} />
            <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                    <Icon
                        name="calendar-outline"
                        size={SIZES.iconLarge}
                        color={COLORS.primary}
                    />
                    <View style={styles.infoTextContainer}>
                        <Text style={styles.infoLabel}>Due date:</Text>
                        <Text style={styles.infoValue}>{dueDate}</Text>
                    </View>
                </View>
                <View style={styles.infoRow}>
                    <Icon
                        name="transgender-outline"
                        size={SIZES.iconLarge}
                        color={COLORS.primary}
                    />
                    <View style={styles.infoTextContainer}>
                        <Text style={styles.infoLabel}>Baby's gender:</Text>
                        <Text style={styles.infoValue}>
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
        backgroundColor: COLORS.border,
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
        color: COLORS.textSecondary,
    },
    infoValue: {
        fontFamily: TYPOGRAPHY.fontFamily.semiBold,
        fontSize: TYPOGRAPHY.fontSize.md,
        color: COLORS.text,
    },
});