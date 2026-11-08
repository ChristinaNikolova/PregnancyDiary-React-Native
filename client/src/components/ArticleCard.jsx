import { useNavigation } from "@react-navigation/native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { StyleSheet, Image, Text, Pressable } from "react-native";

export default function ArticleCard({ id, title, picture }) {
    const navigation = useNavigation();

    return (
        <Pressable style={styles.articleCardWrapper} onPress={() => navigation.navigate("ArticleDetails", { id })}>
            <Image source={{ uri: picture }} style={styles.articleCardPicture} />
            <Text style={styles.articleCardTitle}>{title}</Text>
            <Ionicons name="chevron-forward-outline" size={24} color="#A09087" />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    articleCardWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#EAD9CE',
    },
    articleCardPicture: {
        width: 76,
        height: 76,
        borderRadius: 12,
        backgroundColor: '#EAD9CE',
    },
    articleCardTitle: {
        flex: 1,
        fontFamily: 'DMSans_700Bold',
        fontSize: 16,
        fontWeight: "700",
        lineHeight: 21,
        color: '#49372F',
    },
});