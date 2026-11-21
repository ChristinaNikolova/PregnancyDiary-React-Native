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
import { httpMethods } from "../utils/constants/global";
import { SPACING } from "../theme";

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    rePass: "",
};

// TODO validation + error messages - client
export default function RegisterScreen() {
    const { userAuth } = useAuthContext();

    const { execute, loading, serverError } = useFetch();

    const { fieldHandler, submitHandler, errors } = useForm(
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
                `${API_PATHS.AUTH}/register`,
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
            <HeaderContainer
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
                        handlePress={submitHandler}
                    />
                </View>
            </View>
            <FooterContainer
                text="Already have an account?"
                link="Login"
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