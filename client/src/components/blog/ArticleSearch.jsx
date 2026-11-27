import { StyleSheet, TextInput, View } from "react-native";
import Icon from "../shared/Icon";
import useThemeContext from "../../contexts/theme/useThemeContext";
import { BORDERS, SIZES, SPACING, TYPOGRAPHY } from "../../theme";
// TODO UseMemo/UseCallback/Reducer
export default function ArticleSearch({ searchQuery, handleSearch }) {
    const { theme } = useThemeContext();

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
            <Icon
                iconName="search-outline"
                iconSize={SIZES.iconSmall}
                iconColor={theme.colors.text}
            />
            <TextInput
                returnKeyType="search"
                value={searchQuery}
                placeholder="Search articles..."
                style={[styles.input, { color: theme.colors.text }]}
                placeholderTextColor={theme.colors.textSecondary}
                onChangeText={handleSearch}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: SPACING.lg,
        marginBottom: SPACING.lg,
        paddingHorizontal: SPACING.lg,
        height: 48,
        borderRadius: BORDERS.radius.xxl,
        borderWidth: BORDERS.width.thin,
    },
    input: {
        flex: 1,
        marginLeft: SPACING.md,
        fontFamily: TYPOGRAPHY.fontFamily.regular,
        fontSize: TYPOGRAPHY.fontSize.sm,
    },
});