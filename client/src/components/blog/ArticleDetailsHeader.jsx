import { StyleSheet, View } from "react-native";
import PressableIcon from "../shared/PressableIcon";
import { triggerShare } from "../../utils/native-helpers/share";

// TODO add correct url after deploy
// TODO Pressable Components -> dynamic styles!!!
// TODO Check if nanivation.goBack is needed!!!

export default function ArticleDetailsHeader({ id, title }) {
    const handleShare = () => {
        triggerShare(id, title);
        // TODO add share logic here
    };

    const handleLike = () => {
        // TODO add like logic here
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