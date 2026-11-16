import { StyleSheet, View } from "react-native";
import PressableIcon from "../shared/PressableIcon";
import { triggerShare } from "../../utils/native-helpers/share";

// TODO add correct url after deploy
// TODO Pressable Components -> dynamic styles!!!

export default function ArticleDetailsHeader({ id, title }) {
    const handleShare = () => {
        triggerShare(id, title);
    };

    const handleLike = () => {
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