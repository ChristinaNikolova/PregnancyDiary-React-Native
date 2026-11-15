import { Pressable } from "react-native";
import * as Haptics from "expo-haptics";
import Tag from "./Tag";

export default function PressableTag({ tagText, selected = false, handlePress }) {
    const handleHapticsPress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
            .catch(() => { });
        handlePress?.();
    }

    return (
        <Pressable onPress={handleHapticsPress}>
            <Tag text={tagText} selected={selected} />
        </Pressable>
    );
}