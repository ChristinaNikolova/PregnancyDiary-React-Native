import { StyleSheet, View } from "react-native";
import FormWrapper from "../components/form/FormWrapper";
import FormInput from "../components/form/FormInput";
import FormSelectInput from "../components/form/FormSelectInput";
import FormDatePickerInput from "../components/form/FormDatePickerInput";
import FormHeaderContainer from "../components/form/FormHeaderContainer";
import PrimaryButton from "../components/shared/PrimaryButton";
import ServerError from "../components/shared/ServerError";
import useFetch from "../hooks/useFetch";
import useForm from "../hooks/useForm";
import { apiPaths } from "../utils/constants/api";
import { ROUTES } from "../navigation/routes";
import { babyGenderOptions, httpMethods } from "../utils/constants/global";
import { SPACING } from "../theme";

const initialValues = {
    title: "",
    description: "",
    dueDate: "",
    gender: "",
};

export default function CreateDiaryScreen({ navigation }) {
    const { execute, loading, serverError } = useFetch();

    const { values, fieldHandler, submitHandler, errors, disabledForm } = useForm(
        handleCreate,
        "diary",
        initialValues,
    );

    const handleDateChange = (fieldName, value) => {
        fieldHandler(fieldName).onChange(value);
        fieldHandler(fieldName).onBlur();
    };

    const handleDateBlur = (fieldName) => {
        fieldHandler(fieldName).onBlur();
    };

    async function handleCreate(data) {
        try {
            const { title, description, dueDate, gender } = data;
            await execute(
                apiPaths.DIARIES,
                httpMethods.POST,
                { title, description, dueDate, gender }
            );
            // todo navigate to details
            navigation.navigate(ROUTES.MAIN);
        } catch (err) {
            console.error(err.response?.data || err.message);
        }
    }
    // todo constants
    return (
        <FormWrapper>
            <FormHeaderContainer
                title="Create your diary"
                subTitle=" Let's start your pregnancy journey together."
            />
            {serverError ?
                <ServerError error={serverError} />
                : null}
            <View style={styles.form}>
                <FormInput
                    fieldName="title"
                    placeholder="Diary title"
                    fieldHandler={fieldHandler}
                    iconName="book-outline"
                    error={errors.title}
                />
                <FormInput
                    fieldName="description"
                    placeholder="Tell us a little about your journey..."
                    fieldHandler={fieldHandler}
                    iconName="document-text-outline"
                    error={errors.description}
                    multiline
                    textAlignVertical="top"
                />
                <FormDatePickerInput
                    value={values.dueDate}
                    placeholder="Select your due date"
                    error={errors.dueDate}
                    onChange={(value) => handleDateChange("dueDate", value)}
                    onBlur={() => handleDateBlur("dueDate")}
                />
                <FormSelectInput
                    fieldName="gender"
                    placeholder="Baby's gender"
                    fieldHandler={fieldHandler}
                    iconName="transgender-outline"
                    error={errors.gender}
                    options={babyGenderOptions}
                />
            </View>
            <View style={styles.button}>
                <PrimaryButton
                    buttonText="Create"
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
});