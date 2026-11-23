import { useState } from "react";
import { Alert, FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import WeekCard from "../components/WeekCard";
import useFetch from "../hooks/useFetch";
import { apiPaths } from "../utils/constants/api";
import { getCurrentWeek, isUpcoming } from "../utils/helpers/pregnancy";
import { COLORS, SPACING, TYPOGRAPHY } from "../theme";

export default function WeeksScreen({ route }) {
    const dueDate = route.params.dueDate;
    const diaryId = route.params.diaryId;

    const url = `${apiPaths.DIARIES}/${diaryId}/weeks`;
    const currentWeek = getCurrentWeek(dueDate);

    const [refreshing, setRefreshing] = useState(false);

    const { values: weeks, loading, execute } = useFetch(url);

    const handleRefresh = async () => {
        setRefreshing(true);

        try {
            await execute(url);
        } catch (error) {
            Alert.alert("Error", error.message);
        } finally {
            setRefreshing(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Follow your baby's development week by week.
            </Text>
            <FlatList
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
                data={weeks || []}
                renderItem={({ item }) => {
                    const status = isUpcoming(item.title, currentWeek);
                    return (
                        <WeekCard
                            id={item.id}
                            title={item.title}
                            disabled={status}
                        />
                    );
                }}
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
