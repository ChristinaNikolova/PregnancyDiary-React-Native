import { StyleSheet, View } from "react-native";
import FormWrapper from "../components/form/FormWrapper";
import FormInput from "../components/form/FormInput";
import FormDatePickerInput from "../components/form/FormDatePickerInput";
import FormHeaderContainer from "../components/form/FormHeaderContainer";
import PrimaryButton from "../components/shared/PrimaryButton";
import useFetch from "../hooks/useFetch";
import useForm from "../hooks/useForm";
import { SPACING } from "../theme";

const initialValues = {
    title: "",
    description: "",
    positiveTestDate: "",
    dueDate: "",
    gender: "",
};

export default function CreateDiaryScreen() {
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
            console.log('data', data)
            //const { firstName, lastName, email, password } = data;
            // const result = await execute(
            //     `${apiPaths.AUTH}/register`,
            //     httpMethods.POST,
            //     { firstName, lastName, email, password }
            // );
            // userAuth(result);
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
                    value={values.positiveTestDate}
                    placeholder="When did you get a positive test?"
                    error={errors.positiveTestDate}
                    onChange={(value) => handleDateChange("positiveTestDate", value)}
                    onBlur={() => handleDateBlur("positiveTestDate")}
                />
                <FormDatePickerInput
                    value={values.dueDate}
                    placeholder="Select your due date"
                    error={errors.dueDate}
                    onChange={(value) => handleDateChange("dueDate", value)}
                    onBlur={() => handleDateBlur("dueDate")}
                />
                <FormInput
                    fieldName="gender"
                    placeholder="Baby's gender"
                    fieldHandler={fieldHandler}
                    iconName="person-outline"
                    error={errors.gender}
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