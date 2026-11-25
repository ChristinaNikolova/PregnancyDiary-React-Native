import { useState } from "react";
import { Alert, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import ProfilePicture from "../profile/ProfilePicture";
import BabyProfileRow from "../profile/BabyProfileRow";
import useFetch from "../../hooks/useFetch";
import { apiPaths } from "../../utils/constants/api";
import { httpMethods } from "../../utils/constants/global";
import { BORDERS, COLORS, SIZES, SPACING, TYPOGRAPHY } from "../../theme";

export default function BabyProfile({ diaryId }) {
    const [refreshing, setRefreshing] = useState(false);

    const url = `${apiPaths.BABIES}/${diaryId}`;
    const { values: baby, execute, loading } = useFetch(url);

    const handleRefresh = async () => {
        setRefreshing(true);

        try {
            await execute(
                url,
                httpMethods.GET
            );
        } catch (error) {
            Alert.alert("Error", error.message);
        } finally {
            setRefreshing(false);
        }
    };

    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                />
            }
        >
            <View style={styles.profile}>
                <ProfilePicture
                    image={require("../../assets/images/welcome.png")}
                    iconName="pencil"
                    iconColor={COLORS.white}
                    iconSize={SIZES.iconSmall}
                    handlePress={null}
                />
                <Text style={styles.name}>{baby?.name}</Text>
            </View>
            <View style={styles.details}>
                <BabyProfileRow
                    iconName="calendar-outline"
                    label="Date of birth"
                    value={baby?.birthDate}
                />
                <View style={styles.separator} />
                <BabyProfileRow
                    iconName="time-outline"
                    label="Time of birth"
                    value={baby?.birthTime}
                />
                <View style={styles.separator} />
                <BabyProfileRow
                    iconName="transgender-outline"
                    label="Gender"
                    value={baby?.gender}
                />
                <View style={styles.separator} />
                <BabyProfileRow
                    iconName="resize-outline"
                    label="Height"
                    value={`${baby?.height} cm`}
                />
                <View style={styles.separator} />
                <BabyProfileRow
                    iconName="scale"
                    label="Weight"
                    value={`${baby?.weight} kg`}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: SPACING.md,
    },
    profile: {
        alignItems: "center",
        marginVertical: SPACING.lg,
    },
    name: {
        fontFamily: TYPOGRAPHY.fontFamily.bold,
        fontSize: TYPOGRAPHY.fontSize.xl,
        color: COLORS.text,
    },
    details: {
        paddingHorizontal: SPACING.md,
        borderRadius: BORDERS.radius.xl,
        borderWidth: BORDERS.width.thin,
        borderColor: COLORS.border,
        backgroundColor: COLORS.surface,
    },
    separator: {
        height: BORDERS.width.thin,
        backgroundColor: COLORS.border,
    },
});
