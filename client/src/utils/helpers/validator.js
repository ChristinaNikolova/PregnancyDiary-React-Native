import { auth, global } from "../constants/error";
import {
    auth as authModel,
} from "../constants/model";

export const validator = {
    register: (values, touched) => {
        const errors = {};

        if (touched.firstName && !values.firstName) {
            errors["firstName"] = global.REQUIRED_INPUT;
        }

        if (
            touched.firstName &&
            values.firstName &&
            (
                values.firstName.length < authModel.NAME_MIN_LEN ||
                values.firstName.length > authModel.NAME_MAX_LEN
            )
        ) {
            errors["firstName"] = global.REQUIRED_MIN_MAX_LEN(
                "Firstname",
                authModel.NAME_MIN_LEN,
                authModel.NAME_MAX_LEN
            );
        }

        if (touched.lastName && !values.lastName) {
            errors["lastName"] = global.REQUIRED_INPUT;
        }

        if (
            touched.lastName &&
            values.lastName &&
            (
                values.lastName.length < authModel.NAME_MIN_LEN ||
                values.lastName.length > authModel.NAME_MAX_LEN
            )
        ) {
            errors["lastName"] = global.REQUIRED_MIN_MAX_LEN(
                "lastName",
                authModel.NAME_MIN_LEN,
                authModel.NAME_MAX_LEN
            );
        }

        if (touched.email && !values.email) {
            errors["email"] = global.REQUIRED_INPUT;
        }

        const emailRegex = new RegExp(
            "^\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$"
        );

        if (touched.email && values.email && !emailRegex.test(values.email)) {
            errors["email"] = auth.INVALID_EMAIL;
        }

        if (touched.password && !values.password) {
            errors["password"] = global.REQUIRED_INPUT;
        }

        if (
            touched.password &&
            values.password &&
            (
                values.password.length < authModel.PASSWORD_MIN_LEN ||
                values.password.length > authModel.PASSWORD_MAX_LEN
            )
        ) {
            errors["password"] = global.REQUIRED_MIN_MAX_LEN(
                "Password",
                authModel.PASSWORD_MIN_LEN,
                authModel.PASSWORD_MAX_LEN
            );
        }

        if (
            touched.password &&
            touched.rePass &&
            values.password !== values.rePass
        ) {
            errors["password"] = auth.PASSWORDS_NOT_SAME;
            errors["rePass"] = auth.PASSWORDS_NOT_SAME;
        }

        return errors;
    },

    login: (values, touched) => {
        const errors = {};

        if (touched.email && !values.email) {
            errors["email"] = global.REQUIRED_INPUT;
        }

        if (touched.password && !values.password) {
            errors["password"] = global.REQUIRED_INPUT;
        }

        return errors;
    },
};