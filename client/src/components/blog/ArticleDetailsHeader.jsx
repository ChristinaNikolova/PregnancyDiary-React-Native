import { StyleSheet, View, Share } from "react-native";
import PressableIcon from "../shared/PressableIcon";
import { triggerHaptic } from "../../utils/haptics";

// TODO add correct url after deploy
// TODO Pressable Components -> dynamic styles!!!
export default function ArticleDetailsHeader({ id, title }) {
    const handleShare = async () => {
        triggerHaptic();
        await Share.share({
            title: title,
            message: title,
            url: `https://your-domain.com/articles/${id}`,
        })
    };

    const handleLike = () => {
        triggerHaptic();
        // add like logic
    }

    return (
        <View style={styles.screen}>
            <PressableIcon handlePress={handleLike} iconName="heart-outline" />
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