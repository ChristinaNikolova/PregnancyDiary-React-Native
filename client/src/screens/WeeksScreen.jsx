
import { FlatList, StyleSheet, Text, View } from "react-native";
import WeekCard from "../components/WeekCard";
import useFetch from "../hooks/useFetch";
import { apiPaths } from "../utils/constants/api";
import { COLORS, SPACING, TYPOGRAPHY } from "../theme";

// todo refresh control
export default function WeeksScreen({ route }) {
    const diaryId = route.params.diaryId;

    const { values: weeks } = useFetch(
        `${apiPaths.DIARIES}/${diaryId}/weeks`
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Follow your baby's development week by week.
            </Text>
            <FlatList
                data={weeks || []}
                renderItem={({ item }) =>
                    <WeekCard
                        id={item.id}
                        title={item.title}
                    />
                }
                keyExtractor={(item) => item.id}
                numColumns={3}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: SPACING.md,
        backgroundColor: COLORS.background,
    },
    title: {
        marginBottom: SPACING.xxxl,
        fontFamily: TYPOGRAPHY.fontFamily.semiBold,
        fontSize: TYPOGRAPHY.fontSize.md,
        lineHeight: TYPOGRAPHY.lineHeight.lg,
        textAlign: "center",
        color: COLORS.textSecondary,
    },
    listContent: {
        paddingBottom: SPACING.xl,
    },
    row: {
        justifyContent: "space-between",
        marginBottom: SPACING.md,
    },
});
