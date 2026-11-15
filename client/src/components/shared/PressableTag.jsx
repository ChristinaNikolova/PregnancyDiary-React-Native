import { Pressable } from "react-native";
import Tag from "./Tag";

export default function PressableTag({ tagText, selected = false, handlePress }) {
    return (
        <Pressable onPress={handlePress}>
            <Tag text={tagText} selected={selected} />
        </Pressable>
    );
}