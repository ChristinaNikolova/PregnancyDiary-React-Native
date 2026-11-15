import { useState, useEffect } from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";
import PressableTag from "../shared/PressableTag";
import { categoriesApi } from "../../api";
import { SPACING } from "../../theme";

export default function ArticleCategories({ selectedId, handlePress }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        categoriesApi.all()
            .then(setCategories)
            .catch((error) => Alert.alert("Error", error.message));
    }, []);

    return (
        <ScrollView
            horizontal
            style={styles.categoriesScroll}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
        >
            {categories.map((c) =>
                <PressableTag
                    key={c.id}
                    tagText={c.name}
                    selected={selectedId === c.id}
                    handlePress={() => handlePress(c.id)}
                />
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    categoriesScroll: {
        flexGrow: 0,
    },
    categoriesContainer: {
        paddingHorizontal: SPACING.lg,
        paddingBottom: SPACING.lg,
        gap: SPACING.sm,
    },
});