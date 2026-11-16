import { Pressable } from "react-native";
import Tag from "./Tag";
import { triggerHaptic } from "../../utils/native-helpers/haptics";
import { EFFECTS } from "../../theme";

export default function PressableTag({ tagText, selected = false, handlePress }) {
    const handleHapticsPress = () => {
        triggerHaptic();
        handlePress?.();
    }

    return (
        <Pressable
            style={({ pressed }) => [
                pressed && {
                    opacity: EFFECTS.opacity,
                    transform: [{ scale: EFFECTS.scale }],
                },
            ]}
            onPress={handleHapticsPress}>
            <Tag text={tagText} selected={selected} />
        </Pressable>
    );
}