import useFetch from "../hooks/useFetch";
import useThemeContext from "../contexts/theme/useThemeContext";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Icon from "../components/shared/Icon";
import { apiPaths } from "../utils/constants/api";
import { BORDERS, SPACING, TYPOGRAPHY } from "../theme";

export default function WeekDetailsScreen({ route }) {
    const id = route.params.id;

    const { theme } = useThemeContext();

    const url = `${apiPaths.WEEKS}/${id}`;
    const { values: week, loading } = useFetch(url);

    return (
        <ScrollView
            style={[styles.container, { backgroundColor: theme.colors.background }]}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.hero}>
                <Image
                    source={require("../assets/images/welcome.png")}
                    style={styles.image}
                />

                <View style={styles.weekInfo}>
                    <Text style={[styles.weekTitle, { color: theme.colors.text }]}>
                        Week {week?.title}
                    </Text>

                    <Text style={[styles.trimester, {
                        backgroundColor: theme.colors.secondary,
                        color: theme.colors.text,
                    }]}>
                        {week?.trimester} trimester
                    </Text>

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

            <View style={[styles.section, {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
            }]}>
                <View style={styles.sectionHeader}>
                    <View style={[styles.iconContainer, {
                        backgroundColor: theme.colors.secondary,
                    }]}>
                        <Icon name="person-outline" color={theme.colors.primary} size={24} />
                    </View>

                    <View style={styles.headerText}>
                        <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
                            My measurements
                        </Text>
                        <Text style={[styles.cardSubtitle, { color: theme.colors.textSecondary }]}>
                            Your measurements for this week
                        </Text>
                    </View>
                    <Icon name="chevron-down" color={theme.colors.primary} />
                </View>

                <View style={styles.dataRow}>
                    <View style={[styles.dataCard, { backgroundColor: theme.colors.background }]}>
                        <Icon name="scale-outline" color={theme.colors.primary} size={22} />
                        <Text style={[styles.dataLabel, { color: theme.colors.textSecondary }]}>
                            My weight
                        </Text>
                        <Text style={[styles.dataValue, { color: theme.colors.text }]}>
                            {week?.myWeight || "Add"} {week?.myWeight ? "kg" : ""}
                        </Text>
                    </View>

                    <View style={[styles.dataCard, { backgroundColor: theme.colors.background }]}>
                        <Icon name="resize-outline" color={theme.colors.primary} size={22} />
                        <Text style={[styles.dataLabel, { color: theme.colors.textSecondary }]}>
                            Belly size
                        </Text>
                        <Text style={[styles.dataValue, { color: theme.colors.text }]}>
                            {week?.myBellySize || "Add"} {week?.myBellySize ? "cm" : ""}
                        </Text>
                    </View>
                </View>

                <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>
                    Every little change matters ♡
                </Text>
            </View>
        </ScrollView>
    )
}



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
        width: "43%",
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
        borderWidth: BORDERS.width.thin,
        borderRadius: BORDERS.radius.xl,
        padding: SPACING.lg,
        marginBottom: SPACING.md,
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.md,
        marginBottom: SPACING.lg,
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: BORDERS.radius.lg,
        alignItems: "center",
        justifyContent: "center",
    },
    headerText: {
        flex: 1,
    },
    cardTitle: {
        fontFamily: TYPOGRAPHY.fontFamily.bold,
        fontSize: TYPOGRAPHY.fontSize.lg,
    },
    cardSubtitle: {
        fontFamily: TYPOGRAPHY.fontFamily.regular,
        fontSize: TYPOGRAPHY.fontSize.xs,
        marginTop: SPACING.xs,
    },
    dataRow: {
        flexDirection: "row",
        gap: SPACING.md,
    },
    dataCard: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: SPACING.sm,
        paddingVertical: SPACING.lg,
        paddingHorizontal: SPACING.sm,
        borderRadius: BORDERS.radius.lg,
    },
    dataLabel: {
        fontFamily: TYPOGRAPHY.fontFamily.regular,
        fontSize: TYPOGRAPHY.fontSize.xs,
        textAlign: "center",
    },
    dataValue: {
        fontFamily: TYPOGRAPHY.fontFamily.bold,
        fontSize: TYPOGRAPHY.fontSize.lg,
    },
    footerText: {
        fontFamily: TYPOGRAPHY.fontFamily.regular,
        fontSize: TYPOGRAPHY.fontSize.xs,
        textAlign: "center",
        marginTop: SPACING.lg,
    },
});