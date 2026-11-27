import { memo } from "react";
import { useNavigation } from "@react-navigation/native";
import useThemeContext from "../../contexts/theme/useThemeContext";
import { StyleSheet, Image, Text, Pressable } from "react-native";
import Icon from "../shared/Icon";
import { triggerHaptic } from "../../utils/native-helpers/haptics";
import { ROUTES } from "../../navigation/routes";
import { BORDERS, EFFECTS, SPACING, TYPOGRAPHY } from "../../theme";

function ArticleCard({
    id,
    title,
    picture,
    articleIds
}) {
    const { theme } = useThemeContext();
    const navigation = useNavigation();

    const handlePress = () => {
        triggerHaptic();
        navigation.navigate(ROUTES.ARTICLE_DETAILS, {
            id,
            articleIds,
        });
    };

    return (
        <Pressable
            style={({ pressed }) => [
                styles.screen,
                { borderBottomColor: theme.colors.border },
                pressed && { opacity: EFFECTS.opacity },
            ]}
            onPress={handlePress}>
            <Image source={{ uri: picture }} style={[styles.picture, { backgroundColor: theme.colors.background }]} />
            <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
            <Icon name="chevron-forward-outline" />
        </Pressable>
    );
}

export default memo(ArticleCard);

const styles = StyleSheet.create({
    screen: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.xl,
        borderBottomWidth: BORDERS.width.thin,
    },
    picture: {
        width: 76,
        height: 76,
        borderRadius: BORDERS.radius.lg,
    },
    title: {
        flex: 1,
        fontFamily: TYPOGRAPHY.fontFamily.bold,
        fontSize: TYPOGRAPHY.fontSize.md,
        lineHeight: TYPOGRAPHY.lineHeight.sm,
    },
});