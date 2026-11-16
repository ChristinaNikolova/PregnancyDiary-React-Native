import { View, Text, ImageBackground, StyleSheet, useWindowDimensions } from "react-native"
import PressableButton from "../components/shared/PressableButton";
import { COLORS, SPACING, TYPOGRAPHY } from "../theme";

// TODO later WelcomeScreen
export default function HomeScreen() {
    const { height } = useWindowDimensions();

    const headerPaddingTop = height * 0.14;

    // TODO names function!!!
    const handleStart = () => {
        // TODO start logic...
    }

    return (
        <ImageBackground
            source={require("../assets/images/welcome.png")}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={[styles.container, { paddingTop: headerPaddingTop }]}>
                <View style={styles.header}>
                    <Text style={styles.title}>PregnancyDiary</Text>
                    <Text style={styles.subtitle}>
                        A baby fills a place in your heart that you never knew was empty
                    </Text>
                </View>
                <View style={styles.footer}>
                    <PressableButton handlePress={handleStart} />
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: "100%"
    },
    container: {
        flex: 1,
        justifyContent: "space-between",
        paddingBottom: SPACING.huge,
    },
    header: {
        alignItems: "center",
    },
    footer: {
        alignItems: "center",
    },
    title: {
        marginBottom: SPACING.xl,
        fontFamily: TYPOGRAPHY.fontFamily.semiBold,
        fontSize: TYPOGRAPHY.fontSize.title,
        lineHeight: TYPOGRAPHY.lineHeight.title,
        color: COLORS.text,
        textAlign: "center",
    },
    subtitle: {
        paddingHorizontal: SPACING.huge,
        fontFamily: TYPOGRAPHY.fontFamily.regular,
        fontSize: TYPOGRAPHY.fontSize.md,
        lineHeight: TYPOGRAPHY.lineHeight.lg,
        color: COLORS.text,
        textAlign: "center",
    },
});