import { StyleSheet, View } from "react-native";
import PressableIcon from "../shared/PressableIcon";
import { triggerShare } from "../../utils/native-helpers/share";
import useFetch from "../../hooks/useFetch";
import { httpMethods } from "../../utils/constants/global";
import { API_PATHS } from "../../api/api";
import { SPACING } from "../../theme";

// TODO add correct url after deploy
// TODO Pressable Components -> dynamic styles!!!
// TODO Check if nanivation.goBack is needed!!!

export default function ArticleDetailsHeader({ id, title, isFavourite = false, handleLikePress }) {
    const { execute } = useFetch();

    // todo errors dev
    const handleShare = () => {
        triggerShare(id, title);
        // TODO add share logic here
    };

    const handleLike = async () => {
        try {
            const result = await execute(
                `${API_PATHS.ARTICLES}/${id}`,
                httpMethods.POST,
                {},
            );
            handleLikePress(result);
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <View style={styles.screen}>
            {isFavourite ?
                <PressableIcon handlePress={handleLike} iconName="heart" />
                : <PressableIcon handlePress={handleLike} iconName="heart-outline" />
            }
            <PressableIcon handlePress={handleShare} iconName="share-outline" />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flexDirection: "row",
        justifyContent: "center",
        gap: SPACING.xl,
    },
});