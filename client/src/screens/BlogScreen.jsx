import { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import ArticleSearch from "../components/blog/ArticleSearch";
import ArticlesList from "../components/blog/ArticlesList";
import ArticleCategories from "../components/blog/ArticleCategories";
import { COLORS, SIZES, SPACING } from "../theme";
import Icon from "../components/shared/Icon";

// TODO Scroll Content
// TODO Like/Dislike
export default function BlogScreen({ navigation, route }) {
    const categoryId = route.params?.categoryId;
    const isUserFavourites = route.params?.showFavourites ?? false;

    const [searchQuery, setSearchQuery] = useState("");
    const [pressedTagId, setPressedTagId] = useState(categoryId || "");
    const [showFavourites, setShowFavourites] = useState(false);

    // TODO try not to use useEffect in the components!!!!
    useEffect(() => {
        if (categoryId) {
            setPressedTagId(categoryId);
        }
    }, [categoryId]);

    useEffect(() => {
        setShowFavourites(isUserFavourites);
    }, [isUserFavourites]);

    const handleSearch = (text) => {
        setSearchQuery(text)
    }

    const handlePress = (id) => {
        setPressedTagId((prev) => prev !== id ? id : "");
    }

    const handleClearFavourites = () => {
        setShowFavourites(false);
        navigation.setParams({ showFavourites: false });
    };

    return (
        <View style={styles.screen}>
            {showFavourites && (
                <Pressable
                    onPress={handleClearFavourites}
                    hitSlop={10}
                >
                    <Icon
                        name="close-circle-outline"
                        size={SIZES.iconMedium}
                    />
                </Pressable>
            )}
            <ArticleSearch
                searchQuery={searchQuery}
                handleSearch={handleSearch}
            />
            <ArticleCategories
                selectedId={pressedTagId}
                handlePress={handlePress}
            />
            <ArticlesList
                searchQuery={searchQuery}
                pressedTagId={pressedTagId}
                isFavourite={showFavourites}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingTop: SPACING.lg,
        paddingBottom: SPACING.xxl,
    },
});