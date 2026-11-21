import { StyleSheet, View } from "react-native";
import FormWrapper from "../components/form/FormWrapper";
import HeaderContainer from "../components/auth/HeaderContainer";
import FooterContainer from "../components/auth/FooterContainer";
import PrimaryButton from "../components/shared/PrimaryButton";
import FormInput from "../components/form/FormInput";
import ServerError from "../components/shared/ServerError";
import useForm from "../hooks/useForm";
import useFetch from "../hooks/useFetch";
import useAuthContext from "../contexts/auth/useAuthContext";
import { API_PATHS } from "../api/api";
import { httpMethods } from "../utils/constants/global";
import { SPACING } from "../theme";

const initialValues = {
    email: "",
    password: "",
};

export default function LoginScreen() {
    const { userAuth } = useAuthContext();

    const { execute, loading, serverError } = useFetch();

    const { fieldHandler, submitHandler, errors, disabledForm } = useForm(
        handleLogin,
        "login",
        initialValues,
    );

    async function handleLogin(data) {
        try {
            const { email, password } = data;
            const result = await execute(
                `${API_PATHS.AUTH}/login`,
                httpMethods.POST,
                { email, password }
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
            {serverError ?
                <ServerError error={serverError} />
                : null}
            <View style={styles.form}>
                <FormInput
                    fieldName="email"
                    placeholder="Email"
                    fieldHandler={fieldHandler}
                    iconName="mail-outline"
                    error={errors.email}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
                <FormInput
                    fieldName="password"
                    placeholder="Password"
                    fieldHandler={fieldHandler}
                    iconName="lock-closed-outline"
                    error={errors.password}
                    isPassword
                />
                <View style={styles.button}>
                    <PrimaryButton
                        buttonText="Login"
                        disabled={disabledForm()}
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

const styles = StyleSheet.create({
    form: {
        gap: SPACING.md,
    },
    button: {
        marginTop: SPACING.lg,
    },
});