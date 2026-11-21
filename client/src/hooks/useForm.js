import { useState } from "react";
import { validator } from "../utils/helpers/validator";
import { formHelpers } from "../utils/helpers/form";

export default function useForm(
    callback,
    validatorName,
    initialValues,
) {
    const [values, setValues] = useState(initialValues);
    const [touched, setTouched] = useState({});
    const [errors, setErrors] = useState({});

    const fieldHandler = (fieldName) => {
        return {
            value: values[fieldName],
            onChangeText: (value) => changeHandler(fieldName, value),
            onBlur: () => validateHandler(fieldName),
        };
    };

    const changeHandler = (fieldName, value) => {
        const newValues = {
            ...values,
            [fieldName]: value,
        };
        setValues(newValues);

        if (Object.values(touched).some(Boolean)) {
            setErrors(validator[validatorName](newValues, touched));
        }
    };

    const validateHandler = (fieldName) => {
        const newTouched = {
            ...touched,
            [fieldName]: true,
        };
        setTouched(newTouched);
        const errors = validator[validatorName](values, newTouched);
        setErrors(errors);
    };

    const submitHandler = async () => {
        const data = formHelpers.prepareData(values);
        await callback(data);
    };

    const disabledForm = () => {
        return (
            Object.values(values).some((x) => typeof x === "string" && !x) ||
            Object.keys(errors).length > 0
        );
    };

    return {
        values,
        errors,
        submitHandler,
        fieldHandler,
        disabledForm
    };
}