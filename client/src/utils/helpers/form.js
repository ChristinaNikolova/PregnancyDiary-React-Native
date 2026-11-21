export const formHelpers = {
    prepareData: (values) => {
        const trimmedValues = formHelpers.trimValues(values);
        return trimmedValues;
    },

    trimValues: (values) => {
        return Object.keys(values).reduce((acc, curr) => {
            acc[curr] = formHelpers.trimValue(values[curr]);
            return acc;
        }, {});
    },

    trimValue: (value) => {
        return typeof value === "string" ? value.trim() : value;
    },
};