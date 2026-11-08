import { StyleSheet, ScrollView, Text, Image, View } from "react-native";
import { articles } from "../testData/articles";

// TODO ScrollView
// TODO Categories
// TODO Like, Share Button
// TODO remove tabs navigation
// TODO check all mockups!!!
// TODO Extract css styles
// TODO Rename styles
export default function ArticleDetails({ route }) {
    const articleId = route.params.id;
    const article = articles.filter((a) => a.id === articleId)[0];

    return (
        <ScrollView style={styles.screen}>
            <Image source={{ uri: article.picture }} style={styles.picture} />
            <View style={styles.content}>
                <Text style={styles.title}>{article.title}</Text>
                <Text style={styles.text}>{article.content}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#FAF5EF"
    },
    picture: {
        width: "100%",
        height: 300,
        objectFit: "cover",
    },
    content: {
        padding: 20
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        lineHeight: 34,
        color: "#49372F",
        marginBottom: 36
    },
    text: {
        fontSize: 15,
        lineHeight: 23,
        color: "#6B574E"
    },
});