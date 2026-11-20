export const global = {
    REQUIRED_INPUT: "Input is required",
    REQUIRED_MAX_LEN(name, max) {
        return `${name} should be at most ${max} characters`;
    },
    REQUIRED_MIN_MAX_LEN(name, min, max) {
        return `${name} should be between ${min} and ${max} characters`;
    },
};

export const auth = {
    INVALID_EMAIL: "Invalid email",
    PASSWORDS_NOT_SAME: "Passwords don't match",
};