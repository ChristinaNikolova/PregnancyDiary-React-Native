import { Pressable } from "react-native";
import Icon from "./Icon";
import { triggerHaptic } from "../../utils/haptics";
import { EFFECTS } from "../../theme";

export default function PressableIcon({ iconName, handlePress }) {
    const handleHapticsPress = () => {
        triggerHaptic();
        handlePress?.();
    };

    return (
        <Pressable
            style={({ pressed }) => [
                pressed && {
                    opacity: EFFECTS.opacity,
                    transform: [{ scale: EFFECTS.scale }],
                },
            ]}
            onPress={handleHapticsPress}>
            <Icon iconName={iconName} />
        </Pressable>
    );
}