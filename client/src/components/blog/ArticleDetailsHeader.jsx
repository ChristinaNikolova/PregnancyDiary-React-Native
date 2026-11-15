import { StyleSheet, View } from "react-native";
import PressableIcon from "../shared/PressableIcon";

export default function ArticleDetailsHeader() {
    return (
        <View style={styles.screen}>
            <PressableIcon iconName="heart-outline" />
            <PressableIcon iconName="share-outline" />
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