import { useState } from "react";
// import { validator } from "../utils/helpers/validator";
// import { formHelpers } from "../utils/helpers/form";

export default function useForm(
    callback,
    //validatorName,
    initialValues,
) {
    const [values, setValues] = useState(initialValues);
    const [touched, setTouched] = useState({});
    //const [errors, setErrors] = useState({});
    //const [files, setFiles] = useState({});

    const fieldHandler = (fieldName) => {
        return {
            value: values[fieldName],
            onChangeText: (value) => changeHandler(fieldName, value),
            onBlur: () => validateHandler(fieldName),
        };
    };

    const changeHandler = (fieldName, value) => {
        setValues((state) => ({ ...state, [fieldName]: value }));
    };

    const validateHandler = (fieldName) => {
        setTouched((state) => ({
            ...state,
            [fieldName]: true,
        }));
    };

    const submitHandler = async () => {
        // const data = formHelpers.prepareData(values, files);
        await callback(values);
    };

    // const disabledForm = () => {
    //     return (
    //         Object.values(values).some((x) => typeof x === "string" && !x) ||
    //         Object.keys(errors).length
    //     );
    // };

    return {
        values,
        submitHandler,
        fieldHandler,
    };
}