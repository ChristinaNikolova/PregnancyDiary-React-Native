import { useEffect, useState } from "react";
import { StyleSheet, ScrollView, Text, Image, View, Alert, RefreshControl } from "react-native";
import Icon from "../components/shared/Icon";
import PressableTag from "../components/shared/PressableTag";
import ArticleDetailsHeader from "../components/blog/ArticleDetailsHeader";
import useAuthContext from "../contexts/auth/useAuthContext";
import useFetch from "../hooks/useFetch";
import { ROUTES } from "../navigation/routes";
import { API_PATHS } from "../api/api";
import { httpMethods } from "../utils/constants/global";
import { COLORS, SIZES, SPACING, TYPOGRAPHY } from "../theme";

// TODO ScrollView
// TODO Share Button
// TODO remove tabs navigation
// TODO check all mockups!!!
// TODO Extract css styles
// TODO Rename styles

// TODO CHECK generated Code!!!
// Todo Extract Paragraph component
export default function ArticleDetails({ navigation, route }) {
    const articleId = route.params.id;
    const [refreshing, setRefreshing] = useState(false);

    const { user } = useAuthContext();
    const {
        values: article,
        setValues: setArticle,
        execute,
        loading
    } = useFetch(`${API_PATHS.ARTICLES}/${articleId}`);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <ArticleDetailsHeader
                    id={articleId}
                    title={article?.title}
                    isFavourite={article?.likes?.includes(user?.id)}
                    handleLikePress={handleLikePress}
                />
            ),
        });
    }, [article, navigation, articleId, user?.id]);

    const handleRefresh = async () => {
        setRefreshing(true);

        try {
            await execute(
                `${API_PATHS.ARTICLES}/${articleId}`,
                httpMethods.GET
            );
        } catch (error) {
            Alert.alert("Error", error.message);
        } finally {
            setRefreshing(false);
        }
    };

    const handlePress = () => {
        navigation.popTo(ROUTES.MAIN, {
            screen: ROUTES.BLOG_TAB,
            params: {
                screen: ROUTES.BLOG,
                params: {
                    categoryId: article.categoryId,
                },
            },
        });
    };

    const handleLikePress = (updatedArticle) => {
        setArticle((prev) => ({
            ...prev,
            likes: updatedArticle.likes,
            likesCount: updatedArticle.likes.length,
        }));
    };

    return (
        <ScrollView
            style={styles.screen}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        >
            <Image
                source={{ uri: article?.picture }}
                style={styles.picture}
            />
            <View style={styles.content}>
                <Text style={styles.title}>
                    {article?.title}
                </Text>
                <View style={styles.metaContainer}>
                    <PressableTag
                        tagText={article?.category}
                        handlePress={handlePress}
                    />
                    <View style={styles.createdAt}>
                        <Text style={styles.createdAtText}>
                            {article?.createdAt}
                        </Text>
                    </View>
                    <View style={styles.likesContainer}>
                        <Icon
                            name="heart"
                            color={COLORS.primary}
                            size={SIZES.iconMedium}
                        />
                        <Text style={styles.likesCount}>
                            {article?.likesCount}
                        </Text>
                        <Text style={styles.likesLabel}>likes</Text>
                    </View>
                </View>
                <View style={styles.articleContent}>
                    {article?.content?.map((paragraph, index) => (
                        <Text key={index} style={styles.paragraph}>
                            {paragraph}
                        </Text>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    picture: {
        width: "100%",
        height: 230,
        objectFit: "cover",
    },
    content: {
        paddingHorizontal: SPACING.xl,
        paddingTop: SPACING.xl,
        paddingBottom: SPACING.huge,
    },
    title: {
        marginBottom: SPACING.xl,
        fontFamily: TYPOGRAPHY.fontFamily.bold,
        fontSize: TYPOGRAPHY.fontSize.title,
        lineHeight: TYPOGRAPHY.lineHeight.xxl,
        color: COLORS.text,
    },
    metaContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        alignContent: "center",
        gap: 10,
        marginBottom: SPACING.xxl,
    },
    createdAt: {
        marginLeft: SPACING.xs,
    },
    createdAtText: {
        fontFamily: TYPOGRAPHY.fontFamily.regular,
        fontSize: TYPOGRAPHY.fontSize.sm,
        color: COLORS.textSecondary,
    },
    likesContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
        marginBottom: SPACING.xxl,
    },
    likesCount: {
        fontFamily: TYPOGRAPHY.fontFamily.semiBold,
        fontSize: TYPOGRAPHY.fontSize.sm,
        color: COLORS.text,
    },
    likesLabel: {
        fontFamily: TYPOGRAPHY.fontFamily.regular,
        fontSize: TYPOGRAPHY.fontSize.sm,
        color: COLORS.textSecondary,
    },
    articleContent: {
        gap: 16,
    },
    paragraph: {
        fontFamily: TYPOGRAPHY.fontFamily.regular,
        fontSize: TYPOGRAPHY.fontSize.md,
        lineHeight: TYPOGRAPHY.lineHeight.md,
        color: COLORS.text,
    },
});