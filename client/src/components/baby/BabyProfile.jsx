
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Icon from "../shared/Icon";
import BabyProfileRow from "../BabyProfileRow";
import useFetch from "../../hooks/useFetch";
import { apiPaths } from "../../utils/constants/api";
import { BORDERS, COLORS, SIZES, SPACING, TYPOGRAPHY } from "../../theme";

export default function BabyProfile({ diaryId }) {
    const { values: baby, loading } = useFetch(`${apiPaths.BABIES}/${diaryId}`);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.profile}>
                <View style={styles.pictureContainer}>
                    <Image
                        source={require("../../assets/images/welcome.png")}
                        style={styles.picture}
                    />

                    <Pressable
                        style={styles.editButton}
                        onPress={null}
                    >
                        <Icon
                            name="pencil"
                            size={SIZES.iconSmall}
                            color={COLORS.text}
                        />
                    </Pressable>
                </View>

                <Text style={styles.babyName}>{baby?.name}</Text>
            </View>

            <View style={styles.detailsCard}>
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
    pictureContainer: {
        position: "relative",
        marginBottom: SPACING.sm,
    },
    picture: {
        width: 112,
        height: 112,
        borderRadius: BORDERS.radius.round,
    },
    editButton: {
        position: "absolute",
        right: -5,
        bottom: 0,
        width: 34,
        height: 34,
        borderRadius: BORDERS.radius.round,
        backgroundColor: COLORS.surface,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: BORDERS.width.thin,
        borderColor: COLORS.border,
    },
    babyName: {
        fontFamily: TYPOGRAPHY.fontFamily.bold,
        fontSize: TYPOGRAPHY.fontSize.xl,
        color: COLORS.text,
    },
    detailsCard: {
        backgroundColor: COLORS.surface,
        borderRadius: BORDERS.radius.xl,
        borderWidth: BORDERS.width.thin,
        borderColor: COLORS.border,
        paddingHorizontal: SPACING.md,
        elevation: 2,
    },
    separator: {
        height: BORDERS.width.thin,
        backgroundColor: COLORS.border,
    },
});
