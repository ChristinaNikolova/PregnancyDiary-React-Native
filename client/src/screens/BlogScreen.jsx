import { StyleSheet, View } from "react-native";
import ArticlesList from "../components/blog/ArticlesList";
import { COLORS, SPACING } from "../theme";
import { ArticleSearch } from "../components/blog/ArticleSearch";

// TODO
// Search
// Filter
// Scroll Content
// Categories
// Like/Dislike
// TODO BLOG FontSize!!!
export default function BlogScreen() {
    return (
        <View style={styles.blogWrapper}>
            <ArticleSearch />
            <ArticlesList />
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