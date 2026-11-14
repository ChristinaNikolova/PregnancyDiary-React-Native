import { StyleSheet, ScrollView, Text, Image, View, Alert, RefreshControl } from "react-native";
import { COLORS } from "../theme/colors";
import { useEffect, useState } from "react";
import { articlesApi } from "../api";
import Icon from "../components/shared/Icon";

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
                    <View style={styles.tag}>
                        <Text style={styles.tagText}>
                            {article?.category}
                        </Text>
                    </View>

                    <View style={styles.createdAt}>
                        <Text style={styles.createdAtText}>
                            {article?.createdAt}
                        </Text>
                    </View>

                    <View style={styles.likesContainer}>
                        <Icon
                            iconName="heart"
                            iconColor={COLORS.primary}
                            iconSize={18}
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
        resizeMode: "cover",
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 22,
        paddingBottom: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        lineHeight: 35,
        color: COLORS.text,
        marginBottom: 20,
    },
    metaContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        alignContent: "center",
        gap: 10,
        marginBottom: 24,
    },
    tag: {
        backgroundColor: COLORS.secondary,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
    },
    tagText: {
        color: COLORS.text,
        fontSize: 12,
        fontWeight: "600",
    },
    createdAt: {
        marginLeft: 4,
    },
    createdAtText: {
        color: COLORS.textSecondary,
        fontSize: 13,
    },
    likesContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
        marginBottom: 24,
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