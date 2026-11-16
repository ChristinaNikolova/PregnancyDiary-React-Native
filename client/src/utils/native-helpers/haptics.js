import * as Haptics from "expo-haptics";

export const triggerHaptic = (style = Haptics.ImpactFeedbackStyle.Medium) => {
    // Triggers haptic feedback without blocking the main action.
    Haptics.impactAsync(style).catch(() => { })
}