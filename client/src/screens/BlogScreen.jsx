import { useState } from "react";
import { StyleSheet, View } from "react-native";
import ArticleSearch from "../components/blog/ArticleSearch";
import ArticlesList from "../components/blog/ArticlesList";
import ArticleCategories from "../components/blog/ArticleCategories";
import { COLORS, SPACING } from "../theme";

// TODO
// Filter
// Scroll Content
// Categories
// Like/Dislike
// TODO BLOG FontSize!!!
export default function BlogScreen() {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (text) => {
        setSearchQuery(text)
    }

    return (
        <View style={styles.blogWrapper}>
            <ArticleSearch
                searchQuery={searchQuery}
                handleSearch={handleSearch}
            />
            <ArticleCategories />
            <ArticlesList searchQuery={searchQuery} />
        </View>
    );
}

const styles = StyleSheet.create({
    blogWrapper: {
        flex: 0,
        backgroundColor: COLORS.background,
        paddingTop: SPACING.lg,
        paddingBottom: SPACING.xxl,
    },
});