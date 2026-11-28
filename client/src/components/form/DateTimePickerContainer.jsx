import DateTimePicker from "@react-native-community/datetimepicker";

export default function DateTimePickerContainer({
    value,
    mode = "date",
    minimumDate,
    maximumDate,
    display = "default",
    is24Hour = true,
    textColor,
    themeVariant = "dark",
    handleChange,
}) {
    return (
        <DateTimePicker
            value={value}
            mode={mode}
            is24Hour={is24Hour}
            display={display}
            onChange={handleChange}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
            textColor={textColor}
            themeVariant={themeVariant}
        />
    );
}