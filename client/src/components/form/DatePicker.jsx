import DateTimePicker from "@react-native-community/datetimepicker";

export default function DatePicker({
    value,
    minimumDate = new Date(),
    display = "default",
    handleChange
}) {
    return (
        <DateTimePicker
            value={value}
            mode="date"
            display={display}
            onChange={handleChange}
            minimumDate={minimumDate}
        />
    );
}