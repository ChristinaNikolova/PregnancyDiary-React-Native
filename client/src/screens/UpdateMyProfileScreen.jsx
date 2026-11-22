import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Image, StyleSheet, } from "react-native";
import PrimaryButton from "../components/shared/PrimaryButton";
import FormWrapper from "../components/form/FormWrapper";
import FormInput from "../components/form/FormInput";
import PressableTag from "../components/shared/PressableTag";
import ServerError from "../components/shared/ServerError";
import PressableIcon from "../components/shared/PressableIcon";
import useFetch from "../hooks/useFetch";
import useAuthContext from "../contexts/auth/useAuthContext";
import useForm from "../hooks/useForm";
import usePhotoPicker from "../hooks/usePhotoPicker";
import { API_PATHS } from "../api/api";
import { httpMethods } from "../utils/constants/global";
import { BORDERS, COLORS, SPACING } from "../theme";

// todo rename!!!
// todo fix headers navigatosr + back button
export default function UpdateMyProfileScreen() {
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
        handleUpdateProfile,
        "profile",
        initialValues,
    );

    async function handleUpdateProfile(data) {
        try {
            const { firstName, lastName } = data;
            const result = await execute(
                `${API_PATHS.USERS}`,
                httpMethods.PUT,
                { firstName, lastName }
            );
            updateUser(result);

            if (profilePicture) {
                const formData = new FormData();

                formData.append("picture", {
                    uri: profilePicture,
                    name: "profile-picture.jpg",
                    type: "image/jpeg",
                });

                const updatedUser = await execute(
                    `${API_PATHS.USERS}/picture`,
                    httpMethods.PUT,
                    formData
                );

                updateUser(updatedUser);
            }

            navigation.goBack();
        } catch (err) {
            console.error(err.response?.data || err.message);
        }
    }

    // todo add loading while open gallery/camera
    return (
        <FormWrapper>
            <View style={styles.container}>
                <View style={styles.profilePictureSection}>
                    <View style={styles.profilePictureContainer}>
                        <Image
                            source={
                                profilePicture
                                    ? { uri: profilePicture }
                                    : require("../assets/images/default_profile_image.png")
                            }
                            style={styles.profilePicture}
                        />
                        <View style={styles.editPictureButton}>
                            <PressableIcon
                                iconName="camera"
                                iconColor={COLORS.white}
                                handlePress={showPickerOptions}
                            />
                        </View>
                    </View>
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
            </View>
        </FormWrapper>
    );
}

// todo check stykes
// todo change und remove picture after picture is uploaded
const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: SPACING.xl,
        padding: SPACING.lg,
        paddingBottom: SPACING.xxxl,
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
        borderRadius: BORDERS.radius.round,
        backgroundColor: COLORS.border,
    },
    editPictureButton: {
        position: "absolute",
        right: 0,
        bottom: 0,
        width: 36,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: BORDERS.radius.round,
        backgroundColor: COLORS.primary,
    },
    formSection: {
        gap: SPACING.md,
    },
});