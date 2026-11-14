import { StyleSheet, TextInput, View } from "react-native";
import Icon from "../shared/Icon";
import { COLORS, SIZES, SPACING, TYPOGRAPHY } from "../../theme";

export function ArticleSearch() {
    return (
        <View style={styles.searchContainer}>
            <Icon
                iconName="search-outline"
                iconSize={SIZES.iconSmall}
                iconColor={COLORS.text}
            />
            <TextInput
                style={styles.searchInput}
                placeholder="Search article"
                placeholderTextColor={COLORS.textSecondary}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.surface,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingHorizontal: SPACING.lg,
        height: 48,
        marginHorizontal: SPACING.lg,
        marginBottom: SPACING.lg,
    },

    searchInput: {
        flex: 1,
        marginLeft: SPACING.md,
        fontSize: TYPOGRAPHY.fontSize.sm,
        color: COLORS.text,
        paddingVertical: 0,
    },
});