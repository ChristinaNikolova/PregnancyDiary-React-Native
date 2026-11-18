import { useState } from "react";
import { ImageBackground, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import PressableButton from "../components/shared/PressableButton";
import { BORDERS, COLORS, SPACING, TYPOGRAPHY } from "../theme";

export default function RegisterScreen() {
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    return (
        <ImageBackground
            source={require("../assets/images/auth-background.png")}
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
                >
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <Feather
                                name="heart"
                                size={36}
                                color={COLORS.primary}
                            />
                            <Text style={styles.title}>Create account</Text>
                            <Text style={styles.subtitle}>
                                Start your special journey with us.
                            </Text>
                        </View>
                        <View style={styles.form}>
                            <View style={styles.inputContainer}>
                                <Feather
                                    name="user"
                                    size={SPACING.lg}
                                    color={COLORS.textSecondary}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="First name"
                                    placeholderTextColor={COLORS.textSecondary}
                                    // value={name}
                                    // onChangeText={setName}
                                    autoCapitalize="words"
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Feather
                                    name="user"
                                    size={SPACING.lg}
                                    color={COLORS.textSecondary}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Last name"
                                    placeholderTextColor={COLORS.textSecondary}
                                    // value={name}
                                    // onChangeText={setName}
                                    autoCapitalize="words"
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Feather
                                    name="mail"
                                    size={SPACING.lg}
                                    color={COLORS.textSecondary}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email"
                                    placeholderTextColor={COLORS.textSecondary}
                                    // value={email}
                                    // onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Feather
                                    name="lock"
                                    size={SPACING.lg}
                                    color={COLORS.textSecondary}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Password"
                                    placeholderTextColor={COLORS.textSecondary}
                                // value={password}
                                // onChangeText={setPassword}
                                // secureTextEntry={!showPassword}
                                />
                                <Pressable
                                    onPress={() => setShowPassword((prev) => !prev)}
                                    hitSlop={10}
                                    style={styles.passwordToggle}
                                >
                                    <Feather
                                        name={showPassword ? "eye-off" : "eye"}
                                        size={SPACING.lg}
                                        color={COLORS.textSecondary}
                                    />
                                </Pressable>
                            </View>
                            <View style={styles.inputContainer}>
                                <Feather
                                    name="lock"
                                    size={SPACING.lg}
                                    color={COLORS.textSecondary}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Repeat password"
                                    placeholderTextColor={COLORS.textSecondary}
                                // value={confirmPassword}
                                // onChangeText={setConfirmPassword}
                                // secureTextEntry={!showConfirmPassword}
                                />
                                <Pressable
                                    onPress={() => setShowRepeatPassword((prev) => !prev)}
                                    hitSlop={10}
                                    style={styles.passwordToggle}
                                >
                                    <Feather
                                        name={showRepeatPassword ? "eye-off" : "eye"}
                                        size={SPACING.lg}
                                        color={COLORS.textSecondary}
                                    />
                                </Pressable>
                            </View>
                            <View style={styles.registerButton}>
                                <PressableButton
                                    buttonText="Register"
                                // handlePress={handleRegister}
                                />
                            </View>
                        </View>
                        <View style={styles.loginContainer}>
                            <Text style={styles.loginText}>
                                Already have an account?
                            </Text>
                            <Pressable >
                                <Text style={styles.loginLink}>
                                    Login
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </ImageBackground >
    );
}

// todo reuse theme + gap/spacing
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
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: SPACING.xl,
        paddingVertical: SPACING.xxxl,
    },
    header: {
        alignItems: "center",
        marginBottom: SPACING.xxl,
        gap: SPACING.sm,
    },
    title: {
        fontFamily: TYPOGRAPHY.fontFamily.semiBold,
        fontSize: TYPOGRAPHY.fontSize.xxl,
        lineHeight: TYPOGRAPHY.lineHeight.xxl,
        color: COLORS.text,
        textAlign: "center",
    },
    subtitle: {
        fontFamily: TYPOGRAPHY.fontFamily.regular,
        fontSize: TYPOGRAPHY.fontSize.sm,
        lineHeight: TYPOGRAPHY.lineHeight.md,
        color: COLORS.textSecondary,
        textAlign: "center",
    },
    form: {
        gap: SPACING.md,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        height: 50,
        paddingHorizontal: SPACING.lg,
        borderWidth: BORDERS.width.thin,
        borderColor: COLORS.border,
        borderRadius: BORDERS.radius.xxl,
        gap: SPACING.md,
    },
    input: {
        flex: 1,
        fontFamily: TYPOGRAPHY.fontFamily.regular,
        fontSize: TYPOGRAPHY.fontSize.sm,
        color: COLORS.text,
        paddingVertical: 0,
    },
    passwordToggle: {
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
    },
    registerButton: {
        marginTop: SPACING.lg,
    },
    loginContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: SPACING.xs,
        marginTop: SPACING.xxl,
    },
    loginText: {
        fontFamily: TYPOGRAPHY.fontFamily.regular,
        fontSize: TYPOGRAPHY.fontSize.sm,
        color: COLORS.text,
    },
    loginLink: {
        fontFamily: TYPOGRAPHY.fontFamily.semiBold,
        fontSize: TYPOGRAPHY.fontSize.sm,
        color: COLORS.primary,
    },
});