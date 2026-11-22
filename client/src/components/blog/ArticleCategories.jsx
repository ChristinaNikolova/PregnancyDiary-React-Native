import { ScrollView, StyleSheet } from "react-native";
import PressableTag from "../shared/PressableTag";
import useFetch from "../../hooks/useFetch";
import { apiPaths } from "../../utils/constants/api";
import { SPACING } from "../../theme";

export default function ArticleCategories({ selectedId, handlePress }) {
    const { values: categories } = useFetch(`${apiPaths.CATEGORIES}`);

    return (
        <ScrollView
            horizontal
            style={styles.screen}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            {(categories ?? []).map((c) =>
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
    screen: {
        flexGrow: 0,
    },
    container: {
        paddingHorizontal: SPACING.lg,
        paddingBottom: SPACING.lg,
        gap: 8,
    },
});