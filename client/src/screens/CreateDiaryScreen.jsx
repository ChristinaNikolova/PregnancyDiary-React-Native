import { StyleSheet, Text, View } from "react-native";
import FormWrapper from "../components/form/FormWrapper";
import FormInput from "../components/form/FormInput";
import { COLORS, SPACING, TYPOGRAPHY } from "../theme";
import useFetch from "../hooks/useFetch";
import useForm from "../hooks/useForm";

const initialValues = {
    title: "",
    description: "",
    positiveTestDate: "",
    dueDate: "",
    gender: "",
};

export default function CreateDiaryScreen() {
    const { execute, loading, serverError } = useFetch();

    const { fieldHandler, submitHandler, errors, disabledForm } = useForm(
        handleCreate,
        "diary",
        initialValues,
    );

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

    return (
        <FormWrapper>
            <View style={styles.header}>
                <Text style={styles.title}>Create your diary</Text>
                <Text style={styles.subtitle}>
                    Let's start your pregnancy journey together.
                </Text>
            </View>

            <View style={styles.form}>
                <FormInput
                    fieldName="title"
                    placeholder="Title"
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
                    numberOfLines={4}
                    textAlignVertical="top"
                    style={styles.descriptionInput}
                />

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Important dates
                    </Text>

                    <FormInput
                        fieldName="positiveTestDate"
                        placeholder="Positive test date"
                        fieldHandler={fieldHandler}
                        iconName="calendar-outline"
                        error={errors.positiveTestDate}
                    />

                    <FormInput
                        fieldName="dueDate"
                        placeholder="Expected due date"
                        fieldHandler={fieldHandler}
                        iconName="calendar-outline"
                        error={errors.dueDate}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Baby information
                    </Text>

                    <FormInput
                        fieldName="gender"
                        placeholder="Baby's gender"
                        fieldHandler={fieldHandler}
                        iconName="person-outline"
                        error={errors.gender}
                    />
                </View>
            </View>
        </FormWrapper>
    );
}

const styles = StyleSheet.create({
    content: {
        padding: SPACING.lg,
        paddingBottom: SPACING.xxl,
    },
    header: {
        marginBottom: SPACING.xl,
        gap: SPACING.xs,
    },
    title: {
        fontFamily: TYPOGRAPHY.fontFamily.semiBold,
        fontSize: TYPOGRAPHY.fontSize.xxl,
        color: COLORS.text,
    },
    subtitle: {
        fontFamily: TYPOGRAPHY.fontFamily.regular,
        fontSize: TYPOGRAPHY.fontSize.sm,
        color: COLORS.textSecondary,
    },
    form: {
        gap: SPACING.md,
    },
    section: {
        marginTop: SPACING.md,
        gap: SPACING.md,
    },
    sectionTitle: {
        fontFamily: TYPOGRAPHY.fontFamily.semiBold,
        fontSize: TYPOGRAPHY.fontSize.md,
        color: COLORS.text,
        marginBottom: SPACING.xs,
    },
    descriptionInput: {
        minHeight: 110,
    },
});