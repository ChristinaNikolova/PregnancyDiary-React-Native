
import { usePanGesture } from "react-native-gesture-handler";

export default function useSwipeNavigation({
    ids,
    currentId,
    isChanging,
    onChange,
}) {
    return usePanGesture({
        activeOffsetX: [-20, 20],
        failOffsetY: [-15, 15],
        runOnJS: true,
        onDeactivate: (event) => {
            if (event.canceled || isChanging) return;

            const currentIndex = ids.indexOf(currentId);
            const hasNext = currentIndex < ids.length - 1;
            const hasPrevious = currentIndex > 0;

            if (event.translationX < -50 && hasNext) {
                onChange(ids[currentIndex + 1]);
            } else if (event.translationX > 50 && hasPrevious) {
                onChange(ids[currentIndex - 1]);
            }
        },
    });
}
