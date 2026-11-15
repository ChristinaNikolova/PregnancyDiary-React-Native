import { StyleSheet, View, Share } from "react-native";
import PressableIcon from "../shared/PressableIcon";

// TODO add correct url after deploy
export default function ArticleDetailsHeader({ id, title }) {
    const handleShare = async () => {
        await Share.share({
            title: title,
            message: title,
            url: `https://your-domain.com/articles/${id}`,
        })
    };

    return (
        <View style={styles.screen}>
            <PressableIcon iconName="heart-outline" />
            <PressableIcon handlePress={handleShare} iconName="share-outline" />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 20,
    },
});