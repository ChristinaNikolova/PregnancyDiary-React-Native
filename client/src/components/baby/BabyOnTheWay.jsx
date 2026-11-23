import { ImageBackground, StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../shared/PrimaryButton";
import { COLORS, SPACING, TYPOGRAPHY } from "../../theme";

// todo change db isBabyBorn prop
export default function BabyOnTheWay({ handlePress }) {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../../assets/images/baby.png")}
                style={styles.background}
                imageStyle={styles.image}
                resizeMode="cover"
            >
                <View style={styles.content}>
                    <View style={styles.message}>
                        <Text style={styles.title}>
                            Your baby is on the way!
                        </Text>
                        <Text style={styles.description}>
                            When your little one arrives, tap the button
                            below to create their profile and add their details.
                        </Text>
                    </View>
                    <PrimaryButton
                        buttonText="Baby is born"
                        onPress={handlePress}
                    />
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
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
        paddingHorizontal: SPACING.lg,
        paddingBottom: SPACING.huge,
        gap: SPACING.xxl,
    },
    message: {
        alignItems: "center",
        gap: SPACING.sm,
        paddingHorizontal: SPACING.sm,
    },
    title: {
        fontFamily: TYPOGRAPHY.fontFamily.bold,
        fontSize: TYPOGRAPHY.fontSize.xxl,
        lineHeight: TYPOGRAPHY.lineHeight.xxl,
        textAlign: "center",
        color: COLORS.text,
    },
    description: {
        fontFamily: TYPOGRAPHY.fontFamily.regular,
        fontSize: TYPOGRAPHY.fontSize.md,
        lineHeight: TYPOGRAPHY.lineHeight.lg,
        textAlign: "center",
        color: COLORS.textSecondary,
    },
});