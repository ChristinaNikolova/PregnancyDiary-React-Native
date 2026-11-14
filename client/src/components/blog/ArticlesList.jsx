import { useEffect, useState } from "react";
import { StyleSheet, FlatList, Alert, RefreshControl } from "react-native";
import ArticleCard from "./ArticleCard";
import EmptyState from "../shared/EmptyState";
import { articlesApi } from "../../api";
import { SPACING } from "../../theme";

// TODO: RefreshCotroll
// TODO: Extrach shared logic (fresh)
// TODO Loading State
export default function ArticlesList({ searchQuery = "" }) {
    const [articles, setArticles] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        articlesApi.all()
            .then(setArticles)
            .catch((error) => Alert.alert("Error", error.message));
    }, []);

    const handleRefresh = () => {
        setRefreshing(true);
        articlesApi.all()
            .then(setArticles)
            .catch((error) => Alert.alert("Error", error.message))
            .finally(() => setRefreshing(false));
    }

    const filteredArticles = articles.filter((a) => a.title.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!filteredArticles.length) {
        return <EmptyState text="No articles found" />
    }

    return (
        <FlatList
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            data={filteredArticles}
            keyExtractor={(article) => article.id}
            contentContainerStyle={styles.articlesWrapper}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            renderItem={({ item }) =>
                <ArticleCard
                    id={item.id}
                    title={item.title}
                    picture={item.picture}
                />
            }
        />
    )
}

const styles = StyleSheet.create({
    articlesWrapper: {
        paddingBottom: SPACING.xxxl,
    },
});