import { useState, useEffect } from "react";
import { Alert, Pressable, ScrollView, StyleSheet } from "react-native";
import Tag from "../shared/Tag";
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
                <Pressable key={c.id} onPress={() => handlePress(c.id)}>
                    <Tag text={c.name} selected={selectedId === c.id} />
                </Pressable>)}
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