import { StyleSheet, FlatList, Alert, RefreshControl } from "react-native";
import ArticleCard from "./ArticleCard";
import { useEffect, useState } from "react";
import { articlesApi } from "../../api";
import { SPACING } from "../../theme";

// TODO: RefreshCotroll
// TODO: Extrach shared logic (fresh)
export default function ArticlesList() {
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

    return (
        <FlatList
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            data={articles}
            keyExtractor={(article) => article.id}
            contentContainerStyle={styles.articlesWrapper}
            showsVerticalScrollIndicator={false}
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