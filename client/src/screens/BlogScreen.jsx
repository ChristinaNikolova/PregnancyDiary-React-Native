import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import ArticleSearch from "../components/blog/ArticleSearch";
import ArticlesList from "../components/blog/ArticlesList";
import ArticleCategories from "../components/blog/ArticleCategories";
import { COLORS, SPACING } from "../theme";

// TODO Scroll Content
// TODO Like/Dislike
export default function BlogScreen({ route }) {
    const categoryId = route.params?.categoryId;

    const [searchQuery, setSearchQuery] = useState("");
    const [pressedTagId, setPressedTagId] = useState(categoryId || "");

    // TODO try not to use useEffect in the components!!!!
    useEffect(() => {
        if (categoryId) {
            setPressedTagId(categoryId);
        }
    }, [categoryId]);

    const handleSearch = (text) => {
        setSearchQuery(text)
    }

    const handlePress = (id) => {
        setPressedTagId((prev) => prev !== id ? id : "");
    }

    return (
        <View style={styles.screen}>
            <ArticleSearch
                searchQuery={searchQuery}
                handleSearch={handleSearch}
            />
            <ArticleCategories
                selectedId={pressedTagId}
                handlePress={handlePress}
            />
            <ArticlesList
                searchQuery={searchQuery}
                pressedTagId={pressedTagId}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingTop: SPACING.lg,
        paddingBottom: SPACING.xxl,
    },
});