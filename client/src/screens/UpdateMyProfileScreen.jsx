
import { ScrollView, View, Image, Pressable, StyleSheet } from "react-native";
import PrimaryButton from "../components/shared/PrimaryButton";
import Icon from "../components/shared/Icon";
import FormInput from "../components/form/FormInput";
import PressableTag from "../components/shared/PressableTag";
import ServerError from "../components/shared/ServerError";
import useFetch from "../hooks/useFetch";
import useAuthContext from "../contexts/auth/useAuthContext";
import useForm from "../hooks/useForm";
import { BORDERS, COLORS, SPACING, TYPOGRAPHY } from "../theme";

export default function UpdateMyProfileScreen() {
    const { user } = useAuthContext();
    const initialValues = {
        firstName: user.firstName,
        lastName: user.lastName,
    };

    const { execute, loading, serverError } = useFetch();

    const {
        fieldHandler,
        submitHandler,
        errors,
        disabledForm
    } = useForm(
        handleUpdateProfile,
        "profile",
        initialValues,
    );

    async function handleUpdateProfile(data) {
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
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.profilePictureSection}>
                <View style={styles.profilePictureContainer}>
                    <Image
                        source={require("../assets/images/default_profile_image.png")}
                        style={styles.profilePicture}
                    />
                    <Pressable style={styles.editPictureButton}>
                        <Icon name="camera" />
                    </Pressable>
                </View>

                <View style={styles.pictureActions}>
                    <PressableTag
                        tagText="Change picture"
                        handlePress={null}
                    />

                    <PressableTag
                        tagText="Delete picture"
                        handlePress={null}
                    />

                </View>
            </View>
            {serverError ?
                <ServerError error={serverError} />
                : null}
            <View style={styles.formSection}>
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
            </View>

            <PrimaryButton
                buttonText="Update"
                disabled={disabledForm()}
                handlePress={submitHandler}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    contentContainer: {
        padding: SPACING.lg,
        paddingBottom: SPACING.xxxl,
        gap: SPACING.xl,
    },
    profilePictureSection: {
        alignItems: "center",
        gap: SPACING.md,
    },
    profilePictureContainer: {
        position: "relative",
    },
    profilePicture: {
        width: 120,
        height: 120,
        borderRadius: BORDERS.radius.full,
        backgroundColor: COLORS.border,
    },
    editPictureButton: {
        position: "absolute",
        right: 0,
        bottom: 0,
        width: 36,
        height: 36,
        borderRadius: BORDERS.radius.full,
        backgroundColor: COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
    },
    pictureActions: {
        flexDirection: "row",
        gap: SPACING.xl,
    },
    pictureAction: {
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.xs,
    },
    pictureActionText: {
        fontFamily: TYPOGRAPHY.fontFamily.medium,
        fontSize: TYPOGRAPHY.fontSize.xs,
        color: COLORS.text,
    },
    formSection: {
        gap: SPACING.md,
    },
});