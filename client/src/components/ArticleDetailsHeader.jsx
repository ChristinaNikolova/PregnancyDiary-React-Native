import { Pressable, View } from "react-native";
import CustomIcon from "./shared/CustomIcon";

// todo add screen styles
export default function ArticleDetailsHeader() {
    return (
        <View style={{ flexDirection: "row", gap: 20, justifyContent: "center", }}>
            <Pressable>
                <CustomIcon iconName="heart-outline" />
            </Pressable>
            <Pressable>
                <CustomIcon iconName="share-outline" />
            </Pressable>
        </View>
    );
}