import { StyleSheet, ScrollView, Text, Image, View, Alert } from "react-native";
import { COLORS } from "../theme/colors";
import { useEffect, useState } from "react";
import { articlesApi } from "../api";

// TODO ScrollView
// TODO Categories
// TODO Like, Share Button
// TODO remove tabs navigation
// TODO check all mockups!!!
// TODO Extract css styles
// TODO Rename styles
export default function ArticleDetails({ route }) {
    const articleId = route.params.id;

    const [article, setArticle] = useState({});

    useEffect(() => {
        articlesApi.getById(articleId)
            .then(setArticle)
            .catch((error) => Alert.alert("Error", error.message));
    }, [articleId]);

    return (
        <ScrollView style={styles.screen}>
            <Image source={{ uri: article?.picture }} style={styles.picture} />
            <View style={styles.content}>
                <Text style={styles.title}>{article?.title}</Text>
                <Text style={styles.text}>{article?.content}</Text>
                <Text>{article?.category}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.background
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
        color: COLORS.text,
        marginBottom: 36
    },
    text: {
        fontSize: 15,
        lineHeight: 23,
        color: COLORS.text
    },
});