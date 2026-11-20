import { StyleSheet, View } from "react-native";
import FormWrapper from "../components/shared/FormWrapper";
import HeaderContainer from "../components/auth/HeaderContainer";
import FooterContainer from "../components/auth/FooterContainer";
import PrimaryButton from "../components/shared/PrimaryButton";
import FormInput from "../components/shared/FormInput";
import ServerError from "../components/shared/ServerError";
import useForm from "../hooks/useForm";
import useFetch from "../hooks/useFetch";
import useAuthContext from "../contexts/auth/useAuthContext";
import { API_PATHS } from "../api/api";
import { SPACING } from "../theme";

const initialValues = {
    email: "",
    password: "",
};

// TODO validation + error messages - client
// todo wrong password
export default function LoginScreen() {
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
                    autoCorrect={false}
                    keyboardType="email-address"
                />
                <FormInput
                    fieldName="password"
                    placeholder="Password"
                    fieldHandler={fieldHandler}
                    iconName="lock-closed-outline"
                    isPassword
                />
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
    button: {
        marginTop: SPACING.lg,
    },
});