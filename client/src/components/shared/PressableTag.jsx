import { Pressable } from "react-native";
import Tag from "./Tag";

export default function PressableTag({ text, selected = false, handlePress }) {
    return (
        <Pressable onPress={handlePress}>
            <Tag text={text} selected={selected} />
        </Pressable>
    );
}