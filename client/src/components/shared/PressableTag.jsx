import { Pressable } from "react-native";
import Tag from "./Tag";
import { triggerHaptic } from "../../utils/haptics";

export default function PressableTag({ tagText, selected = false, handlePress }) {
    const handleHapticsPress = () => {
        triggerHaptic();
        handlePress();
    }

    return (
        <Pressable onPress={handleHapticsPress}>
            <Tag text={tagText} selected={selected} />
        </Pressable>
    );
}