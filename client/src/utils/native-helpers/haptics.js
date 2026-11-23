import * as Haptics from "expo-haptics";

export const triggerHaptic = (style = Haptics.ImpactFeedbackStyle.Medium) => {
    Haptics.impactAsync(style).catch(() => { })
}