import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import ArticleSearch from "../components/blog/ArticleSearch";
import ArticlesList from "../components/blog/ArticlesList";
import { COLORS, SPACING } from "../theme";
import { categoriesApi } from "../api";

// TODO
// Filter
// Scroll Content
// Categories
// Like/Dislike
// TODO BLOG FontSize!!!
export default function BlogScreen() {
    const [searchQuery, setSearchQuery] = useState("");
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        categoriesApi.all()
            .then(setCategories)
            .catch((error) => Alert.alert("Error", error.message));
    }, [])

    const handleSearch = (text) => {
        setSearchQuery(text)
    }

    return (
        <View style={styles.blogWrapper}>
            <ArticleSearch
                searchQuery={searchQuery}
                handleSearch={handleSearch}
            />
            <View>
                {categories.map((c) => <Text key={c.id}>{c.name}</Text>)}
            </View>
            <ArticlesList searchQuery={searchQuery} />
        </View>
    );
}

const styles = StyleSheet.create({
    blogWrapper: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingTop: SPACING.lg,
        paddingBottom: SPACING.xxl,
    },
});