import { ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import useThemeContext from "../../contexts/theme/useThemeContext";
import { SPACING } from "../../theme";

export default function FormWrapper({ children }) {
    const { isDarkMode } = useThemeContext();

    const backgroundImage = isDarkMode
        ? require("../../assets/images/auth-background-dark.png")
        : require("../../assets/images/auth-background.png");


    return (
        <ImageBackground
            source={backgroundImage}
            style={styles.background}
            resizeMode="cover"
        >
            <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    automaticallyAdjustKeyboardInsets
                >
                    <View style={styles.container}>
                        {children}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </ImageBackground >
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: "100%",
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: "center",
    },
    container: {
        paddingHorizontal: SPACING.xl,
        paddingVertical: SPACING.xxxl,
    },
});