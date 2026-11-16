import { StyleSheet, TextInput, View } from "react-native";
import Icon from "../shared/Icon";
import { BORDERS, COLORS, SIZES, SPACING, TYPOGRAPHY } from "../../theme";
// TODO UseMemo/UseCallback/Reducer
export default function ArticleSearch({ searchQuery, handleSearch }) {
    return (
        <View style={styles.container}>
            <Icon
                iconName="search-outline"
                iconSize={SIZES.iconSmall}
                iconColor={COLORS.text}
            />
            <TextInput
                returnKeyType="search"
                value={searchQuery}
                placeholder="Search articles..."
                style={styles.input}
                placeholderTextColor={COLORS.textSecondary}
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
        backgroundColor: COLORS.surface,
        borderRadius: BORDERS.radius.xxl,
        borderWidth: BORDERS.width.thin,
        borderColor: COLORS.border,
    },
    input: {
        flex: 1,
        marginLeft: SPACING.md,
        fontFamily: TYPOGRAPHY.fontFamily.regular,
        fontSize: TYPOGRAPHY.fontSize.sm,
        color: COLORS.text,
    },
});