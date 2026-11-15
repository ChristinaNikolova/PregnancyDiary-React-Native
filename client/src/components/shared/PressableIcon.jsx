import { Pressable } from "react-native";
import Icon from "./Icon";

export default function PressableIcon({ iconName, handlePress }) {
    return (
        <Pressable onPress={handlePress}>
            <Icon iconName={iconName} />
        </Pressable>
    );
}