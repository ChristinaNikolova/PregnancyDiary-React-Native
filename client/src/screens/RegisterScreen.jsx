import { StyleSheet, View } from "react-native";
import FormWrapper from "../components/form/FormWrapper";
import FormHeaderContainer from "../components/form/FormHeaderContainer";
import FormFooterContainer from "../components/form/FormFooterContainer";
import PrimaryButton from "../components/shared/PrimaryButton";
import FormInput from "../components/form/FormInput";
import ServerError from "../components/shared/ServerError";
import useForm from "../hooks/useForm";
import useFetch from "../hooks/useFetch";
import useAuthContext from "../contexts/auth/useAuthContext";
import { httpMethods } from "../utils/constants/global";
import { apiPaths } from "../utils/constants/api";
import { SPACING } from "../theme";

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    rePass: "",
};

export default function RegisterScreen() {
    const { userAuth } = useAuthContext();

    const { execute, loading, serverError } = useFetch();

    const { fieldHandler, submitHandler, errors, disabledForm } = useForm(
        handleRegister,
        "register",
        initialValues,
    );

    // todo async/await try/catch
    // todo constants
    // todo add loading
    // todo fix pass, confirm pass bug
    async function handleRegister(data) {
        try {
            const { firstName, lastName, email, password } = data;
            const result = await execute(
                `${apiPaths.AUTH}/register`,
                httpMethods.POST,
                { firstName, lastName, email, password }
            );
            userAuth(result);
        } catch (err) {
            console.error(err.response?.data || err.message);
        }
    }

    return (
        <FormWrapper>
            <FormHeaderContainer
                title="Create account"
                subTitle="Start your special journey with us."
            />
            {serverError ?
                <ServerError error={serverError} />
                : null}
            <View style={styles.form}>
                <FormInput
                    fieldName="firstName"
                    placeholder="First name"
                    fieldHandler={fieldHandler}
                    iconName="person-outline"
                    error={errors.firstName}
                    autoCapitalize="words"
                />
                <FormInput
                    fieldName="lastName"
                    placeholder="Last name"
                    fieldHandler={fieldHandler}
                    iconName="person-outline"
                    error={errors.lastName}
                    autoCapitalize="words"
                />
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
                <FormInput
                    fieldName="rePass"
                    placeholder="Repeat password"
                    fieldHandler={fieldHandler}
                    iconName="lock-closed-outline"
                    error={errors.rePass}
                    isPassword
                />
                <View style={styles.button}>
                    <PrimaryButton
                        buttonText="Register"
                        disabled={disabledForm()}
                        handlePress={submitHandler}
                    />
                </View>
            </View>
            <FormFooterContainer
                text="Already have an account?"
                link="Login"
            />
        </FormWrapper >
    );
}

// todo reuse theme + gap/spacing
// todo check font families
const styles = StyleSheet.create({
    form: {
        gap: SPACING.md,
    },
    button: {
        marginTop: SPACING.lg,
    },
});