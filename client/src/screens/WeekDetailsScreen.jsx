import useFetch from "../hooks/useFetch";
import useThemeContext from "../contexts/theme/useThemeContext";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Icon from "../components/shared/Icon";
import Tag from "../components/shared/Tag";
import SwipeableMeasurements from "../components/week/SwipeableMeasurements";
import { apiPaths } from "../utils/constants/api";
import { getWeekImage } from "../utils/helpers/image";
import { triggerHaptic } from "../utils/native-helpers/haptics";
import { BORDERS, SIZES, SPACING, TYPOGRAPHY } from "../theme";

export default function WeekDetailsScreen({ route }) {
    const { theme } = useThemeContext();
    const id = route.params.id;

    const url = `${apiPaths.WEEKS}/${id}`;
    const { values: week, loading } = useFetch(url);

    const image = getWeekImage(week?.title);

    const handleEdit = () => {
        triggerHaptic();
        null;
    }
    // todo pull to refresh
    // todo constants
    return (
        <ScrollView
            style={[styles.container, { backgroundColor: theme.colors.background }]}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.hero}>
                <Image
                    source={image}
                    style={styles.image}
                />
                <View style={styles.weekInfo}>
                    <Text style={[styles.weekTitle, { color: theme.colors.text }]}>
                        Week {week?.title}
                    </Text>
                    <Tag
                        text={`${week?.trimester} trimester`}
                    />
                    <Text style={[styles.babySize, { color: theme.colors.text }]}>
                        Your baby is the size of {week?.babySize}
                    </Text>
                    <View style={styles.measurements}>
                        <View style={styles.measurement}>
                            <Icon name="resize-outline" color={theme.colors.primary} />
                            <Text style={[styles.measurementText, { color: theme.colors.text }]}>
                                Around {week?.babyAverageHeight} cm
                            </Text>
                        </View>

                        <View style={styles.measurement}>
                            <Icon name="scale-outline" color={theme.colors.primary} />
                            <Text style={[styles.measurementText, { color: theme.colors.text }]}>
                                Around {week?.babyAverageWeight} g
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.development}>
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                    Baby development
                </Text>

                <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
                    {week?.text}
                </Text>
            </View>
            <View style={[styles.section, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
                <View style={styles.sectionHeader}>
                    <View style={[styles.iconContainer, {
                        backgroundColor: theme.colors.secondary,
                    }]}>
                        <Icon name="heart-outline" color={theme.colors.primary} size={SIZES.iconDefault} />
                    </View>

                    <View style={styles.headerText}>
                        <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
                            My measurements
                        </Text>
                        <Text style={[styles.cardSubtitle, { color: theme.colors.textSecondary }]}>
                            Your measurements for this week
                        </Text>
                    </View>
                </View>
                <SwipeableMeasurements
                    weight={week?.myWeight}
                    bellySize={week?.myBellySize}
                    handlePress={handleEdit}
                />
                <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>
                    Every little change matters
                </Text>
            </View>
        </ScrollView>
    )
}
// todo swipe
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flexGrow: 1,
        padding: SPACING.md,
        paddingBottom: SPACING.xxl,
    },
    hero: {
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.md,
        marginBottom: SPACING.xl,
    },
    image: {
        width: "40%",
        aspectRatio: 1,
        borderRadius: BORDERS.radius.xl,
    },
    weekInfo: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "center",
        gap: SPACING.sm,
    },
    weekTitle: {
        fontFamily: TYPOGRAPHY.fontFamily.bold,
        fontSize: TYPOGRAPHY.fontSize.xxl,
    },
    trimester: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs,
        borderRadius: BORDERS.radius.lg,
        fontFamily: TYPOGRAPHY.fontFamily.semiBold,
        fontSize: TYPOGRAPHY.fontSize.xs,
        overflow: "hidden",
    },
    babySize: {
        fontFamily: TYPOGRAPHY.fontFamily.semiBold,
        fontSize: TYPOGRAPHY.fontSize.md,
    },
    measurements: {
        gap: SPACING.md,
        marginTop: SPACING.sm,
    },
    measurement: {
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.xs,
    },
    measurementText: {
        fontFamily: TYPOGRAPHY.fontFamily.regular,
        fontSize: TYPOGRAPHY.fontSize.sm,
    },
    development: {
        marginBottom: SPACING.xl,
        gap: SPACING.md,
    },
    sectionTitle: {
        fontFamily: TYPOGRAPHY.fontFamily.bold,
        fontSize: TYPOGRAPHY.fontSize.xl,
    },
    description: {
        fontFamily: TYPOGRAPHY.fontFamily.regular,
        fontSize: TYPOGRAPHY.fontSize.md,
        lineHeight: 25,
    },
    section: {
        marginBottom: SPACING.md,
        padding: SPACING.lg,
        borderWidth: BORDERS.width.thin,
        borderRadius: BORDERS.radius.xl,
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.md,
        marginBottom: SPACING.lg,
    },
    iconContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: 44,
        height: 44,
        borderRadius: BORDERS.radius.lg,
    },
    headerText: {
        flex: 1,
    },
    cardTitle: {
        fontFamily: TYPOGRAPHY.fontFamily.bold,
        fontSize: TYPOGRAPHY.fontSize.lg,
    },
    cardSubtitle: {
        marginTop: SPACING.xs,
        fontFamily: TYPOGRAPHY.fontFamily.regular,
        fontSize: TYPOGRAPHY.fontSize.xs,
    },
    footerText: {
        marginTop: SPACING.lg,
        fontFamily: TYPOGRAPHY.fontFamily.regular,
        fontSize: TYPOGRAPHY.fontSize.xs,
        textAlign: "center",
    },
});