import { Pressable, StyleSheet, View } from "react-native";
import Icon from "../shared/Icon";

export default function ArticleDetailsHeader() {
    return (
        <View style={styles.screen}>
            <Pressable>
                <Icon iconName="heart-outline" />
            </Pressable>
            <Pressable>
                <Icon iconName="share-outline" />
            </Pressable>
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