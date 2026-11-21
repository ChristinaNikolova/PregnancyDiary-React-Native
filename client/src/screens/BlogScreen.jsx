import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import ArticleSearch from "../components/blog/ArticleSearch";
import ArticlesList from "../components/blog/ArticlesList";
import ArticleCategories from "../components/blog/ArticleCategories";
import ClearButton from "../components/shared/ClearButton";
import { COLORS, SPACING } from "../theme";

// TODO Scroll Content
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
            <ArticleSearch
                searchQuery={searchQuery}
                handleSearch={handleSearch}
            />
            <ArticleCategories
                selectedId={pressedTagId}
                handlePress={handlePress}
            />
            {showFavourites && <ClearButton handlePress={handleClearFavourites} />}
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
        paddingTop: SPACING.lg,
        paddingBottom: SPACING.xxl,
        backgroundColor: COLORS.background,
    },
});