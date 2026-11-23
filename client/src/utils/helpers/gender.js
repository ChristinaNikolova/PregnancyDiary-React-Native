import { babyGenderOptions } from "../constants/global";

export function getGenderLabel(gender) {
    return (
        babyGenderOptions.find((option) => option.value === gender)?.label ??
        ""
    );
}