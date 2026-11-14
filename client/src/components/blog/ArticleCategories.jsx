import { useState, useEffect } from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";
import Tag from "../shared/Tag";
import { categoriesApi } from "../../api";
import { SPACING } from "../../theme";

export default function ArticleCategories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        categoriesApi.all()
            .then(setCategories)
            .catch((error) => Alert.alert("Error", error.message));
    }, [])

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
        >
            {categories.map((c) => <Tag key={c.id} text={c.name} />)}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    categoriesContainer: {
        paddingHorizontal: SPACING.lg,
        paddingBottom: SPACING.lg,
        gap: SPACING.sm,
    },
});