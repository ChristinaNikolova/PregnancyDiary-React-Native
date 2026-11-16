import { StyleSheet, Text, View } from "react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "../../theme";

export default function Tag({ text, selected = false }) {
    return (
        <View style={[
            styles.tagWrapper,
            selected && styles.selectedTag
        ]}>
            <Text style={[
                styles.tagText,
                selected && styles.selectedTagText
            ]}>
                {text}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    tagWrapper: {
        minHeight: 30,
        alignSelf: "flex-start",
        justifyContent: "center",
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.sm,
        borderRadius: 20,
        backgroundColor: COLORS.secondary,
    },
    tagText: {
        fontFamily: TYPOGRAPHY.fontFamily.semiBold,
        fontSize: TYPOGRAPHY.fontSize.xs,
        color: COLORS.text,
    },
    selectedTag: {
        backgroundColor: COLORS.primary,
    },
    selectedTagText: {
        color: COLORS.white,
    },
});