import { StyleSheet, FlatList, Alert } from "react-native";
import ArticleCard from "./ArticleCard";
import { useEffect, useState } from "react";
import { articlesApi } from "../api";

export default function ArticlesList() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        articlesApi.all()
            .then((res) => setArticles(res.articles))
            .catch((error) => Alert.alert("Error", error.message));
    }, []);

    return (
        <FlatList
            data={articles}
            keyExtractor={(article) => article.id}
            contentContainerStyle={styles.articlesWrapper}
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
        paddingBottom: 32,
    },
});