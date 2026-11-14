import { Pressable, View } from "react-native";
import Icon from "./shared/Icon";

// todo add screen styles
export default function ArticleDetailsHeader() {
    return (
        <View style={{ flexDirection: "row", gap: 20, justifyContent: "center", }}>
            <Pressable>
                <Icon iconName="heart-outline" />
            </Pressable>
            <Pressable>
                <Icon iconName="share-outline" />
            </Pressable>
        </View>
    );
}