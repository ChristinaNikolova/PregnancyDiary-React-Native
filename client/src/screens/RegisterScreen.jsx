import { useState } from "react";
import { ImageBackground, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import PressableButton from "../components/shared/PressableButton";
import FormInput from "../components/shared/FormInput";
import Icon from "../components/shared/Icon";
import useForm from "../hooks/useForm";
import { BORDERS, COLORS, SIZES, SPACING, TYPOGRAPHY } from "../theme";
import { authApi } from "../api";

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    rePass: "",
};

// TODO validation + error messages - client + server
export default function RegisterScreen() {
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    const { fieldHandler, submitHandler } = useForm(
        handleRegister,
        initialValues,
    );

    // todo async/await try/catch
    async function handleRegister(data) {
        try {
            const { firstName, lastName, email, password } = data;

            const result = await authApi.register(
                firstName,
                lastName,
                email,
                password
            );

            console.log("REGISTER RESULT:", result);
        } catch (err) {
            console.error(err.response?.data || err.message);
        }
    }

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
                            <Icon
                                name="heart-outline"
                                size={36}
                                color={COLORS.primary}
                            />
                            <Text style={styles.title}>Create account</Text>
                            <Text style={styles.subtitle}>
                                Start your special journey with us.
                            </Text>
                        </View>
                        <View style={styles.form}>
                            <FormInput
                                fieldName="firstName"
                                placeholder="First name"
                                fieldHandler={fieldHandler}
                                iconName="person-outline"
                                autoCapitalize="words"
                            />
                            <FormInput
                                fieldName="lastName"
                                placeholder="Last name"
                                fieldHandler={fieldHandler}
                                iconName="person-outline"
                                autoCapitalize="words"
                            />
                            <FormInput
                                fieldName="email"
                                placeholder="Email"
                                fieldHandler={fieldHandler}
                                iconName="mail-outline"
                                autoCapitalize="none"
                                keyboardType="email-address"
                            />
                            <View style={styles.inputContainer}>
                                <Icon
                                    name="lock-closed-outline"
                                    size={SIZES.iconSmall}
                                    color={COLORS.textSecondary}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Password"
                                    placeholderTextColor={COLORS.textSecondary}
                                    secureTextEntry={!showPassword}
                                    {...fieldHandler("password")}
                                />
                                <Pressable
                                    onPress={() => setShowPassword((prev) => !prev)}
                                    hitSlop={10}
                                    style={styles.passwordToggle}
                                >
                                    <Icon
                                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                                        size={SIZES.iconMedium}
                                        color={COLORS.textSecondary}
                                    />
                                </Pressable>
                            </View>
                            <View style={styles.inputContainer}>
                                <Icon
                                    name="lock-closed-outline"
                                    size={SIZES.iconSmall}
                                    color={COLORS.textSecondary}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Repeat password"
                                    placeholderTextColor={COLORS.textSecondary}
                                    secureTextEntry={!showRepeatPassword}
                                    {...fieldHandler("rePass")}
                                />
                                <Pressable
                                    onPress={() => setShowRepeatPassword((prev) => !prev)}
                                    hitSlop={10}
                                    style={styles.passwordToggle}
                                >
                                    <Icon
                                        name={showRepeatPassword ? "eye-off-outline" : "eye-outline"}
                                        size={SIZES.iconMedium}
                                        color={COLORS.textSecondary}
                                    />
                                </Pressable>
                            </View>
                            <View style={styles.registerButton}>
                                <PressableButton
                                    buttonText="Register"
                                    handlePress={submitHandler}
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
// todo remove login
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