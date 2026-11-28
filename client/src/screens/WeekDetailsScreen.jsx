import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import useFetch from "../hooks/useFetch";
import { apiPaths } from "../utils/constants/api";
import useThemeContext from "../contexts/theme/useThemeContext";
import { BORDERS, SPACING, TYPOGRAPHY } from "../theme";
import Icon from "../components/shared/Icon";

export default function WeekDetailsScreen({ route }) {
    const id = route.params.id;

    const { theme } = useThemeContext();

    const url = `${apiPaths.WEEKS}/${id}`;
    const { values: week, loading } = useFetch(url);

    console.log(week?.babySize);

    return (
        <ScrollView
            style={[styles.container, { backgroundColor: theme.colors.background }]}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.hero}>
                <Image source={require("../assets/images/welcome.png")} style={styles.image} />

                <View style={styles.heroInfo}>
                    <Text style={[styles.trimester, {
                        backgroundColor: theme.colors.secondary,
                        color: theme.colors.text,
                    }]}>
                        {week?.trimester} trimester
                    </Text>

                    <Text style={[styles.babySize, { color: theme.colors.text }]}>
                        Your baby is the size of {week?.babySize}
                    </Text>

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

            {/* Baby development */}
            <View style={styles.development}>
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                    Baby development
                </Text>
                <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
                    {week?.text}
                </Text>
            </View>

            {/* My measurements */}
            <View style={[styles.section, {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
            }]}>
                <View style={styles.sectionHeader}>
                    <Icon name="person-outline" color={theme.colors.primary} size={24} />
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
                        <Icon name="scale-outline" color={theme.colors.primary} />
                        <View>
                            <Text style={[styles.dataLabel, { color: theme.colors.textSecondary }]}>
                                My weight
                            </Text>
                            <Text style={[styles.dataValue, { color: theme.colors.text }]}>
                                {week?.myWeight || "Add"} {week?.myWeight ? "kg" : ""}
                            </Text>
                        </View>
                    </View>

                    <View style={[styles.dataCard, { backgroundColor: theme.colors.background }]}>
                        <Icon name="resize-outline" color={theme.colors.primary} />
                        <View>
                            <Text style={[styles.dataLabel, { color: theme.colors.textSecondary }]}>
                                Belly size
                            </Text>
                            <Text style={[styles.dataValue, { color: theme.colors.text }]}>
                                {week?.myBellySize || "Add"} {week?.myBellySize ? "cm" : ""}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: SPACING.md,
    },
    hero: {
        flexDirection: "row",
        gap: SPACING.md,
        marginBottom: SPACING.lg,
    },
    image: {
        width: "48%",
        aspectRatio: 1,
        borderRadius: BORDERS.radius.xl,
    },
    heroInfo: {
        flex: 1,
        justifyContent: "center",
        gap: SPACING.md,
    },
    trimester: {
        alignSelf: "flex-start",
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs,
        borderRadius: BORDERS.radius.lg,
        fontFamily: TYPOGRAPHY.fontFamily.semiBold,
        fontSize: TYPOGRAPHY.fontSize.xs,
    },
    babySize: {
        fontFamily: TYPOGRAPHY.fontFamily.semiBold,
        fontSize: TYPOGRAPHY.fontSize.md,
    },
    measurement: {
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.sm,
    },
    measurementText: {
        fontFamily: TYPOGRAPHY.fontFamily.regular,
        fontSize: TYPOGRAPHY.fontSize.sm,
    },
    development: {
        marginBottom: SPACING.lg,
        gap: SPACING.sm,
    },
    sectionTitle: {
        fontFamily: TYPOGRAPHY.fontFamily.bold,
        fontSize: TYPOGRAPHY.fontSize.xl,
    },
    description: {
        fontFamily: TYPOGRAPHY.fontFamily.regular,
        fontSize: TYPOGRAPHY.fontSize.md,
        lineHeight: 24,
    },
    section: {
        borderWidth: BORDERS.width.thin,
        borderRadius: BORDERS.radius.xl,
        padding: SPACING.md,
        marginBottom: SPACING.md,
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.md,
        marginBottom: SPACING.md,
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
    },
    dataRow: {
        flexDirection: "row",
        gap: SPACING.sm,
    },
    dataCard: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.sm,
        padding: SPACING.sm,
        borderRadius: BORDERS.radius.lg,
    },
    dataLabel: {
        fontFamily: TYPOGRAPHY.fontFamily.regular,
        fontSize: TYPOGRAPHY.fontSize.xs,
    },
    dataValue: {
        fontFamily: TYPOGRAPHY.fontFamily.bold,
        fontSize: TYPOGRAPHY.fontSize.md,
    },
});
