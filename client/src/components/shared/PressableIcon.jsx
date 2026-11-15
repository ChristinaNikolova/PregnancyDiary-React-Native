import { Pressable } from "react-native";
import Icon from "./Icon";

export default function PressableIcon({ iconName }) {
    return (
        <Pressable>
            <Icon iconName={iconName} />
        </Pressable>
    );
}