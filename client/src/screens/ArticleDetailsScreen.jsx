import { StyleSheet, ScrollView, Text, Image, View, Alert, RefreshControl } from "react-native";
import { useEffect, useState } from "react";
import { articlesApi } from "../api";
import Icon from "../components/shared/Icon";
import Tag from "../components/shared/Tag";
import { COLORS, SIZES, SPACING } from "../theme";

// TODO ScrollView
// TODO Categories
// TODO Like, Share Button
// TODO remove tabs navigation
// TODO check all mockups!!!
// TODO Extract css styles
// TODO Rename styles

// TODO CHECK generated Code!!!
export default function ArticleDetails({ route }) {
    const articleId = route.params.id;

    const [article, setArticle] = useState({});
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        articlesApi.getById(articleId)
            .then(setArticle)
            .catch((error) => Alert.alert("Error", error.message));
    }, [articleId]);

    const handleRefresh = () => {
        setRefreshing(true);
        articlesApi.getById(articleId)
            .then(setArticle)
            .catch((error) => Alert.alert("Error", error.message))
            .finally(() => setRefreshing(false));
    }

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
                    <Tag text={article?.category} />

                    <View style={styles.createdAt}>
                        <Text style={styles.createdAtText}>
                            {article?.createdAt}
                        </Text>
                    </View>

                    <View style={styles.likesContainer}>
                        <Icon
                            iconName="heart"
                            iconColor={COLORS.primary}
                            iconSize={SIZES.iconMedium}
                        />
                        <Text style={styles.likesCount}>
                            {article.likesCount}
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
        fontSize: 28,
        fontWeight: "700",
        lineHeight: 35,
        color: COLORS.text,
        marginBottom: SPACING.xl,
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
        color: COLORS.textSecondary,
        fontSize: 13,
    },
    likesContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
        mmarginBottom: SPACING.xxl,
    },
    likesCount: {
        color: COLORS.text,
        fontSize: 14,
        fontWeight: "600",
    },
    likesLabel: {
        color: COLORS.textSecondary,
        fontSize: 13,
    },
    articleContent: {
        gap: 16,
    },
    paragraph: {
        color: COLORS.text,
        fontSize: 15,
        lineHeight: 24,
    },
});