import DateTimePicker from "@react-native-community/datetimepicker";

export default function DateTimePickerContainer({
    value,
    mode = "date",
    minimumDate,
    display = "default",
    is24Hour = true,
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
        />
    );
}