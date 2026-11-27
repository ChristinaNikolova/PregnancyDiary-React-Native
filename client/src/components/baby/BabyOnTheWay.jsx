import { useNavigation } from "@react-navigation/native";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../shared/PrimaryButton";
import useThemeContext from "../../contexts/theme/useThemeContext";
import { SPACING, TYPOGRAPHY } from "../../theme";

// todo change db isBabyBorn prop
export default function BabyOnTheWay({ diaryId }) {
    const navigation = useNavigation();
    const { theme, isDarkMode } = useThemeContext();

    const backgroundImage = isDarkMode
        ? require("../../assets/images/baby-dark.png")
        : require("../../assets/images/baby.png");

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background, }]}>
            <ImageBackground
                source={backgroundImage}
                style={styles.background}
                imageStyle={styles.image}
                resizeMode="cover"
            >
                <View style={[
                    styles.content,
                    { backgroundColor: theme.colors.whiteBackground },
                ]}>
                    <View style={styles.message}>
                        <Text style={[styles.title, { color: theme.colors.text, }]}>
                            Your baby is on the way!
                        </Text>
                        <Text style={[styles.description, { color: theme.colors.textSecondary, }]}>
                            When your little one arrives, tap the button
                            below to create their profile and add their details.
                        </Text>
                    </View>
                    <PrimaryButton
                        buttonText="Baby is born"
                        handlePress={() => navigation.navigate("BabyForm", { diaryId })}
                    />
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        justifyContent: "flex-end",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    content: {
        alignItems: "center",
        marginHorizontal: SPACING.lg,
        marginBottom: SPACING.huge,
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.xl,
        borderRadius: 28,
        gap: SPACING.xxl,
    },
    message: {
        alignItems: "center",
        gap: SPACING.sm,
    },
    title: {
        fontFamily: TYPOGRAPHY.fontFamily.bold,
        fontSize: TYPOGRAPHY.fontSize.xxl,
        lineHeight: TYPOGRAPHY.lineHeight.xxl,
        textAlign: "center",
    },
    description: {
        fontFamily: TYPOGRAPHY.fontFamily.regular,
        fontSize: TYPOGRAPHY.fontSize.md,
        lineHeight: TYPOGRAPHY.lineHeight.lg,
        textAlign: "center",
    },
});