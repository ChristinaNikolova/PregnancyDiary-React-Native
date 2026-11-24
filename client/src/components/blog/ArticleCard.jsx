import { memo } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Image, Text, Pressable } from "react-native";
import Icon from "../shared/Icon";
import { triggerHaptic } from "../../utils/native-helpers/haptics";
import { ROUTES } from "../../navigation/routes";
import { BORDERS, COLORS, EFFECTS, SPACING, TYPOGRAPHY } from "../../theme";

function ArticleCard({
    id,
    title,
    picture,
    articleIds
}) {
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
                pressed && { opacity: EFFECTS.opacity },
            ]}
            onPress={handlePress}>
            <Image source={{ uri: picture }} style={styles.picture} />
            <Text style={styles.title}>{title}</Text>
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
        borderBottomColor: COLORS.border,
        borderBottomWidth: BORDERS.width.thin,
    },
    picture: {
        width: 76,
        height: 76,
        borderRadius: BORDERS.radius.lg,
        backgroundColor: COLORS.background,
    },
    title: {
        flex: 1,
        fontFamily: TYPOGRAPHY.fontFamily.bold,
        fontSize: TYPOGRAPHY.fontSize.md,
        lineHeight: TYPOGRAPHY.lineHeight.sm,
        color: COLORS.text,
    },
});