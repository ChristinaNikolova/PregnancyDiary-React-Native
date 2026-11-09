import { StyleSheet, FlatList } from "react-native";
import ArticleCard from "./ArticleCard";
import { articles } from "../testData/articles";

export default function ArticlesList() {
    return (
        <FlatList
            data={articles}
            keyExtractor={(article) => article._id}
            contentContainerStyle={styles.articlesWrapper}
            renderItem={({ item }) =>
                <ArticleCard
                    id={item._id}
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