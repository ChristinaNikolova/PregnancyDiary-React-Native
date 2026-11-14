import { useState } from "react";
import { StyleSheet, View } from "react-native";
import ArticleSearch from "../components/blog/ArticleSearch";
import ArticlesList from "../components/blog/ArticlesList";
import ArticleCategories from "../components/blog/ArticleCategories";
import { COLORS, SPACING } from "../theme";

// TODO
// Filter
// Scroll Content
// Like/Dislike
// TODO BLOG FontSize!!!
export default function BlogScreen() {
    const [searchQuery, setSearchQuery] = useState("");
    const [pressedTag, setPressedTag] = useState("")

    const handleSearch = (text) => {
        setSearchQuery(text)
    }

    const handlePress = (id) => {
        setPressedTag((prev) => prev !== id ? id : "");
    }

    return (
        <View style={styles.blogWrapper}>
            <ArticleSearch
                searchQuery={searchQuery}
                handleSearch={handleSearch}
            />
            <ArticleCategories
                handlePress={handlePress}
            />
            <ArticlesList
                searchQuery={searchQuery}
                pressedTag={pressedTag}
            />
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