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
        console.log('fieldName', fieldName)
        return {
            value: values[fieldName],
            onChangeText: (value) => changeHandler(fieldName, value),
            onBlur: () => validateHandler(fieldName),
        };
    };

    const changeHandler = (fieldName, value) => {
        setValues((state) => ({ ...state, [fieldName]: value }));
        console.log("chane")
    };

    const validateHandler = (fieldName) => {
        setTouched((state) => ({
            ...state,
            [fieldName]: true,
        }));
    };

    const submitHandler = async () => {
        // const data = formHelpers.prepareData(values, files);
        console.log("data values", values);
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