import { useEffect, useState } from "react";
import { GestureDetector, usePanGesture } from "react-native-gesture-handler";
import { StyleSheet, ScrollView, Text, Image, View, Alert, RefreshControl } from "react-native";
import Icon from "../components/shared/Icon";
import PressableTag from "../components/shared/PressableTag";
import ArticleDetailsHeader from "../components/blog/ArticleDetailsHeader";
import useAuthContext from "../contexts/auth/useAuthContext";
import useFetch from "../hooks/useFetch";
import { ROUTES } from "../navigation/routes";
import { httpMethods } from "../utils/constants/global";
import { apiPaths } from "../utils/constants/api";
import { COLORS, SIZES, SPACING, TYPOGRAPHY } from "../theme";

// TODO Share Button
// TODO remove tabs navigation
// TODO Rename styles
export default function ArticleDetails({ navigation, route }) {
    const articleIds = route.params.articleIds;

    const [articleId, setArticleId] = useState(route.params.id);
    const [refreshing, setRefreshing] = useState(false);

    const { user } = useAuthContext();
    const {
        values: article,
        setValues: setArticle,
        execute,
        loading
    } = useFetch(`${apiPaths.ARTICLES}/${articleId}`);

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
                `${apiPaths.ARTICLES}/${articleId}`,
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

    const handleArticleChange = (targetId) => {
        setArticleId(targetId);
    };

    const currentIndex = articleIds.indexOf(articleId);
    const hasNext = currentIndex < articleIds.length - 1;
    const hasPrevious = currentIndex > 0;

    const swipeGesture = usePanGesture({
        activeOffsetX: [-20, 20],
        failOffsetY: [-15, 15],
        runOnJS: true,
        onDeactivate: (event) => {
            if (event.canceled) return;

            if (event.translationX < -80 && currentIndex < articleIds.length - 1) {
                handleArticleChange(articleIds[currentIndex + 1]);
            } else if (event.translationX > 80 && currentIndex > 0) {
                handleArticleChange(articleIds[currentIndex - 1]);
            }
        },
    });

    return (
        <GestureDetector gesture={swipeGesture}>
            <ScrollView
                style={styles.screen}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                    />
                }
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
        </GestureDetector>
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