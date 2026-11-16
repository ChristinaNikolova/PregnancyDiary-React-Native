import { memo } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Image, Text, Pressable } from "react-native";
import Icon from "../shared/Icon";
import { COLORS, EFFECTS, SPACING, TYPOGRAPHY } from "../../theme";
import { ROUTES } from "../../navigation/routes";

function ArticleCard({ id, title, picture }) {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate(ROUTES.ARTICLE_DETAILS, { id })
    }

    return (
        <Pressable
            style={({ pressed }) => [
                styles.articleCardWrapper,
                pressed && { opacity: EFFECTS.opacity },
            ]}
            onPress={handlePress} >
            <Image source={{ uri: picture }} style={styles.articleCardPicture} />
            <Text style={styles.articleCardTitle}>{title}</Text>
            <Icon iconName="chevron-forward-outline" />
        </Pressable>
    );
}

export default memo(ArticleCard);

// todo reuse styles!!!
// TODO Use Poppins
const styles = StyleSheet.create({
    articleCardWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.xl,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    articleCardPicture: {
        width: 76,
        height: 76,
        borderRadius: 12,
        backgroundColor: COLORS.background,
    },
    articleCardTitle: {
        flex: 1,
        fontFamily: TYPOGRAPHY.fontFamily.bold,
        fontSize: TYPOGRAPHY.fontSize.md,
        lineHeight: TYPOGRAPHY.lineHeight.sm,
        color: COLORS.text,
    },
});