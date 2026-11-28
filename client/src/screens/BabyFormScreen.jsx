import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import useFetch from "../hooks/useFetch";
import useForm from "../hooks/useForm";
import { View, StyleSheet } from "react-native";
import FormWrapper from "../components/form/FormWrapper";
import FormInput from "../components/form/FormInput";
import PrimaryButton from "../components/shared/PrimaryButton";
import usePhotoPicker from "../hooks/usePhotoPicker";
import FormSelectInput from "../components/form/FormSelectInput";
import FormDatePickerInput from "../components/form/FormDatePickerInput";
import FormHeaderContainer from "../components/form/FormHeaderContainer";
import ServerError from "../components/shared/ServerError";
import ProfilePicture from "../components/profile/ProfilePicture";
import PressableTag from "../components/shared/PressableTag";
import { babyGenderOptions, httpMethods } from "../utils/constants/global";
import { apiPaths } from "../utils/constants/api";
import { COLORS, SPACING } from "../theme";

export default function BabyFormScreen() {
    const navigation = useNavigation();
    const route = useRoute();

    const { mode, diaryId, baby = {} } = route.params ?? {};
    const isEditMode = mode === "update";

    const { execute, loading, serverError } = useFetch();

    const initialValues = {
        name: baby?.name,
        birthDate: baby?.birthDate,
        birthTime: baby?.birthTime,
        gender: baby?.gender,
        height: baby?.height,
        weight: baby?.weight,
    };

    const [babyPicture, setBabyPicture] = useState(null);
    const { showPickerOptions } = usePhotoPicker({
        onChange: setBabyPicture,
    });

    const {
        values,
        fieldHandler,
        submitHandler,
        errors,
        disabledForm,
    } = useForm(handleCreate, "baby", initialValues);

    const handleDateChange = (fieldName, value) => {
        fieldHandler(fieldName).onChange(value);
        fieldHandler(fieldName).onBlur();
    };

    const handleDateBlur = (fieldName) => {
        fieldHandler(fieldName).onBlur();
    };

    async function handleCreate(data) {
        try {
            // todo add back button
            const { name, birthDate, birthTime, gender, weight, height } = data;
            const babyData = {
                name,
                birthDate,
                birthTime,
                gender,
                weight,
                height,
            };

            // todo check ... for create and edit
            const result = await execute(
                isEditMode
                    ? `${apiPaths.BABIES}/${baby.id}`
                    : apiPaths.BABIES,
                isEditMode ? httpMethods.PUT : httpMethods.POST,
                isEditMode ? { ...babyData } : { diaryId, ...babyData }
            );

            if (result && babyPicture) {
                const formData = new FormData();

                formData.append("picture", {
                    uri: babyPicture,
                    name: "baby-picture.jpg",
                    type: "image/jpeg",
                });

                await execute(
                    `${apiPaths.BABIES}/${result._id}/picture`,
                    httpMethods.PUT,
                    formData
                );
            }
            // todo fix back here
            const babyId = isEditMode ? baby.id : result._id;

            if (isEditMode) {
                navigation.popTo("Baby", {
                    babyId,
                    isBabyBorn: true,
                });
            } else {
                navigation.replace("Baby", {
                    diaryId,
                    babyId,
                    isBabyBorn: true,
                });
            }
        } catch (err) {
            console.error(err.response?.data || err.message);
        }
    }

    return (
        <FormWrapper>
            <FormHeaderContainer
                title={!isEditMode ? "Create Baby Profile" : "Update Baby Profile"}
                subTitle={
                    !isEditMode
                        ? "Add your little one's details to your diary."
                        : "Keep your baby's details up to date."
                }
            />
            {serverError ?
                <ServerError error={serverError} />
                : null}
            <View style={styles.form}>
                <View style={styles.picture}>
                    <ProfilePicture
                        image={
                            babyPicture
                                ? { uri: babyPicture }
                                : baby?.picture?.url
                                    ? { uri: baby.picture.url }
                                    : require("../assets/images/welcome.png")
                        }
                        iconName="camera"
                        iconColor={COLORS.white}
                        handlePress={showPickerOptions}
                    />
                    {babyPicture && (
                        <PressableTag
                            tagText="Delete picture"
                            handlePress={() => setBabyPicture(null)}
                        />
                    )}
                </View>
                <FormInput
                    fieldName="name"
                    placeholder="Baby name"
                    fieldHandler={fieldHandler}
                    iconName="person-outline"
                    error={errors.name}
                    autoCapitalize="words"
                />
                <FormDatePickerInput
                    value={values.birthDate}
                    placeholder="Select date of birth"
                    maximumDate={new Date()}
                    error={errors.birthDate}
                    onChange={(value) => handleDateChange("birthDate", value)}
                    onBlur={() => handleDateBlur("birthDate")}
                />
                <FormDatePickerInput
                    value={values.birthTime}
                    placeholder="Select time of the birth"
                    mode="time"
                    error={errors.birthTime}
                    onChange={(value) => handleDateChange("birthTime", value)}
                    onBlur={() => handleDateBlur("birthTime")}
                />
                <FormSelectInput
                    fieldName="gender"
                    placeholder="Baby's gender"
                    fieldHandler={fieldHandler}
                    iconName="transgender-outline"
                    error={errors.gender}
                    options={babyGenderOptions.filter((o) => o.label !== "I don't know yet")}
                />
                <FormInput
                    fieldName="height"
                    placeholder="Height (cm)"
                    fieldHandler={fieldHandler}
                    iconName="resize-outline"
                    error={errors.height}
                    keyboardType="numeric"
                />
                <FormInput
                    fieldName="weight"
                    placeholder="Weight (kg)"
                    fieldHandler={fieldHandler}
                    iconName="scale-outline"
                    error={errors.weight}
                    keyboardType="numeric"
                />
            </View>
            <View style={styles.button}>
                <PrimaryButton
                    buttonText="Save"
                    disabled={disabledForm()}
                    handlePress={submitHandler}
                />
            </View>
        </FormWrapper>
    );
}

const styles = StyleSheet.create({
    form: {
        gap: SPACING.md,
    },
    button: {
        marginTop: SPACING.lg,
    },
    picture: {
        alignItems: "center",
        gap: SPACING.md,
    },
});