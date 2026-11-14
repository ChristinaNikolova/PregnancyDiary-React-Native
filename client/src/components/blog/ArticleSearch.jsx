import { StyleSheet, TextInput, View } from "react-native";
import Icon from "../shared/Icon";
import { COLORS, SIZES, SPACING, TYPOGRAPHY } from "../../theme";

export function ArticleSearch({ searchQuery, handleSearch }) {
    return (
        <View style={styles.searchContainer}>
            <Icon
                iconName="search-outline"
                iconSize={SIZES.iconSmall}
                iconColor={COLORS.text}
            />
            <TextInput
                returnKeyType="search"
                value={searchQuery}
                placeholder="Search articles..."
                style={styles.searchInput}
                placeholderTextColor={COLORS.textSecondary}
                onChangeText={handleSearch}
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