import Ionicons from "@react-native-vector-icons/ionicons";
import { COLORS } from "../../theme/colors";

// TODO extract values as constants
const ICON_SIZE = 24

export default function CustomIcon({ iconName, iconSize = ICON_SIZE, iconColor = COLORS.text }) {
    return (
        <Ionicons
            name={iconName}
            size={iconSize}
            color={iconColor} />
    );
}