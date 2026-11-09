import { StyleSheet, View } from "react-native";
import ArticlesList from "../components/ArticlesList";
import { COLORS } from "../theme/colors";

// TODO
// Search
// Filter
// Scroll Content
// Categories
// Like/Dislike
export default function BlogScreen() {
    return (
        <View style={styles.blogWrapper}>
            <ArticlesList />
        </View>
    );
}

const styles = StyleSheet.create({
    blogWrapper: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
});