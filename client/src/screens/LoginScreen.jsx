import { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import FormWrapper from "../components/shared/FormWrapper";
import HeaderContainer from "../components/auth/HeaderContainer";
import FooterContainer from "../components/auth/FooterContainer";
import PrimaryButton from "../components/shared/PrimaryButton";
import FormInput from "../components/shared/FormInput";
import Icon from "../components/shared/Icon";
import ServerError from "../components/shared/ServerError";
import useForm from "../hooks/useForm";
import useFetch from "../hooks/useFetch";
import useAuthContext from "../contexts/auth/useAuthContext";
import { API_PATHS } from "../api/api";
import { BORDERS, COLORS, SIZES, SPACING, TYPOGRAPHY } from "../theme";

const initialValues = {
    email: "",
    password: "",
};

// TODO validation + error messages - client
export default function LoginScreen() {
    const [showPassword, setShowPassword] = useState(false);

    const { userAuth } = useAuthContext();

    const { execute, loading, serverError } = useFetch();

    const { fieldHandler, submitHandler } = useForm(
        handleLogin,
        initialValues,
    );

    async function handleLogin(data) {
        try {
            const result = await execute(
                `${API_PATHS.AUTH}/login`,
                "post",
                data
            );
            userAuth(result);
        } catch (err) {
            console.error(err.response?.data || err.message);
        }
    }

    return (
        <FormWrapper>
            <HeaderContainer
                title="Login"
                subTitle="Welcome back! Your journey continues here."
            />
            {serverError ? (
                <ServerError error={serverError} />
            ) : null}
            <View style={styles.form}>
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
                <View style={styles.button}>
                    <PrimaryButton
                        buttonText="Login"
                        handlePress={submitHandler}
                    />
                </View>
            </View>
            <FooterContainer
                text="Don't have an account yet? Sign up"
                link="Register"
            />
        </FormWrapper >
    );
}

// todo reuse theme + gap/spacing

const styles = StyleSheet.create({
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
    button: {
        marginTop: SPACING.lg,
    },
});