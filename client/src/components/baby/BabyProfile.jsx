import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import ProfilePicture from "../profile/ProfilePicture";
import BabyProfileRow from "../profile/BabyProfileRow";
import useFetch from "../../hooks/useFetch";
import useThemeContext from "../../contexts/theme/useThemeContext";
import { apiPaths } from "../../utils/constants/api";
import { httpMethods } from "../../utils/constants/global";
import { BORDERS, SIZES, SPACING, TYPOGRAPHY } from "../../theme";

export default function BabyProfile({ babyId }) {
    const { theme } = useThemeContext();

    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation();

    const url = `${apiPaths.BABIES}/${babyId}`;
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
                    iconColor={theme.colors.white}
                    iconSize={SIZES.iconSmall}
                    handlePress={() => navigation.navigate("BabyForm", { baby })}
                />
                <Text style={[styles.name, { color: theme.colors.text }]}>{baby?.name}</Text>
            </View>
            <View style={[styles.details, { borderColor: theme.colors.border, backgroundColor: theme.colors.surface }]}>
                <BabyProfileRow
                    iconName="calendar-outline"
                    label="Date of birth"
                    value={baby?.birthDate}
                />
                <View style={[styles.separator, { backgroundColor: theme.colors.border }]} />
                <BabyProfileRow
                    iconName="time-outline"
                    label="Time of birth"
                    value={baby?.birthTime}
                />
                <View style={[styles.separator, { backgroundColor: theme.colors.border }]} />
                <BabyProfileRow
                    iconName="transgender-outline"
                    label="Gender"
                    value={baby?.gender}
                />
                <View style={[styles.separator, { backgroundColor: theme.colors.border }]} />
                <BabyProfileRow
                    iconName="resize-outline"
                    label="Height"
                    value={`${baby?.height} cm`}
                />
                <View style={[styles.separator, { backgroundColor: theme.colors.border }]} />
                <BabyProfileRow
                    iconName="scale-outline"
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
    },
    details: {
        paddingHorizontal: SPACING.md,
        borderRadius: BORDERS.radius.xl,
        borderWidth: BORDERS.width.thin,
    },
    separator: {
        height: BORDERS.width.thin,
    },
});
