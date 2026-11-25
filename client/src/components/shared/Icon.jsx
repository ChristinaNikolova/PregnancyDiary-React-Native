import Ionicons from "@react-native-vector-icons/ionicons";
import { COLORS, SIZES } from "../../theme";

export default function Icon({
    name,
    size = SIZES.iconDefault,
    color = COLORS.text
}) {
    return (
        <Ionicons
            name={name}
            size={size}
            color={color}
        />
    );
}