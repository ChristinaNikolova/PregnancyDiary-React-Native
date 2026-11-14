import Ionicons from "@react-native-vector-icons/ionicons";
import { COLORS, SIZES } from "../../theme";

export default function Icon({ iconName, iconSize = SIZES.iconDefault, iconColor = COLORS.text }) {
    return (
        <Ionicons
            name={iconName}
            size={iconSize}
            color={iconColor} />
    );
}