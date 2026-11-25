import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, } from "react-native";
import PrimaryButton from "../components/shared/PrimaryButton";
import FormWrapper from "../components/form/FormWrapper";
import FormInput from "../components/form/FormInput";
import PressableTag from "../components/shared/PressableTag";
import ServerError from "../components/shared/ServerError";
import ProfilePicture from "../components/profile/ProfilePicture";
import useFetch from "../hooks/useFetch";
import useAuthContext from "../contexts/auth/useAuthContext";
import useForm from "../hooks/useForm";
import usePhotoPicker from "../hooks/usePhotoPicker";
import { httpMethods } from "../utils/constants/global";
import { apiPaths } from "../utils/constants/api";
import { COLORS, SPACING } from "../theme";

// todo fix headers navigatosr + back button
export default function UpdateProfileScreen() {
    const [profilePicture, setProfilePicture] = useState(null);
    const navigation = useNavigation();

    const { showPickerOptions } = usePhotoPicker({
        onChange: setProfilePicture,
    });

    const { user, updateUser } = useAuthContext();
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
        handleUpdate,
        "profile",
        initialValues,
    );

    async function handleUpdate(data) {
        try {
            const { firstName, lastName } = data;
            const updateNamesResult = await execute(
                `${apiPaths.USERS}`,
                httpMethods.PUT,
                { firstName, lastName }
            );
            updateUser(updateNamesResult);

            if (profilePicture) {
                const formData = new FormData();

                formData.append("picture", {
                    uri: profilePicture,
                    name: "profile-picture.jpg",
                    type: "image/jpeg",
                });

                const updatedPictureResult = await execute(
                    `${apiPaths.USERS}/picture`,
                    httpMethods.PUT,
                    formData
                );
                updateUser(updatedPictureResult);
            }

            navigation.goBack();
        } catch (err) {
            console.error(err.response?.data || err.message);
        }
    }

    const handlePress = showPickerOptions;

    // todo add loading while open gallery/camera
    return (
        <FormWrapper>
            <View style={styles.container}>
                <View style={styles.picture}>
                    <ProfilePicture
                        image={
                            profilePicture
                                ? { uri: profilePicture }
                                : user.picture?.url
                                    ? { uri: user.picture.url }
                                    : require("../assets/images/default_profile_image.png")
                        }
                        iconName="camera"
                        iconColor={COLORS.white}
                        handlePress={handlePress}
                    />
                    {profilePicture && (
                        <PressableTag
                            tagText="Delete picture"
                            handlePress={() => setProfilePicture(null)}
                        />
                    )}
                </View>
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
                </View>
                <PrimaryButton
                    buttonText="Update"
                    disabled={disabledForm()}
                    handlePress={submitHandler}
                />
            </View>
        </FormWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: SPACING.xl,
        padding: SPACING.lg,
        paddingBottom: SPACING.xxxl,
    },
    picture: {
        alignItems: "center",
        gap: SPACING.md,
    },
    form: {
        gap: SPACING.md,
    },
});