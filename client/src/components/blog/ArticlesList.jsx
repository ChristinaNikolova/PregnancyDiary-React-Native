import { useCallback, useMemo, useRef, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, FlatList, Alert, RefreshControl } from "react-native";
import ArticleCard from "./ArticleCard";
import EmptyState from "../shared/EmptyState";
import useAuthContext from "../../contexts/auth/useAuthContext";
import useFetch from "../../hooks/useFetch";
import { errorMessagesNoItems, httpMethods } from "../../utils/constants/global";
import { API_PATHS } from "../../api/api";
import { SPACING } from "../../theme";

// TODO: RefreshCotroll
// TODO: Extrach shared logic (fresh)
// TODO Loading State
// todo add alert, loading comonents
export default function ArticlesList({ searchQuery = "", pressedTagId = "", isFavourite = false }) {
    const [refreshing, setRefreshing] = useState(false);

    const { user } = useAuthContext();
    const {
        values: articles,
        execute,
        loading
    } = useFetch(`${API_PATHS.ARTICLES}/all`);

    const fetchArticles = useCallback(async () => {
        await execute(`${API_PATHS.ARTICLES}/all`, httpMethods.GET);
    }, [execute]);

    const isFirstFocus = useRef(true);

    useFocusEffect(
        useCallback(() => {
            if (isFirstFocus.current) {
                isFirstFocus.current = false;
                return;
            }

            fetchArticles()
                .catch((error) =>
                    Alert.alert("Error", error.message)
                );
        }, [fetchArticles])
    );

    const handleRefresh = async () => {
        setRefreshing(true);

        try {
            await fetchArticles();
        } catch (error) {
            Alert.alert("Error", error.message);
        } finally {
            setRefreshing(false);
        }
    };

    const filteredArticles = useMemo(() => {
        return (articles ?? []).filter((a) => {
            const matchesSearch = a.title
                .toLowerCase()
                .includes(searchQuery.toLowerCase());

            const matchesCategory = !pressedTagId || a.categoryId === pressedTagId;

            const favourites = !isFavourite || a.likes?.includes(user?.id);

            return matchesSearch && matchesCategory && favourites;
        });
    }, [articles, searchQuery, pressedTagId, isFavourite, user?.id]);

    if (!filteredArticles?.length) {
        return <EmptyState text={errorMessagesNoItems.NO_ARTICLES} />
    }

    return (
        <FlatList
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            data={filteredArticles}
            keyExtractor={(article) => article.id}
            contentContainerStyle={styles.screen}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            renderItem={({ item }) =>
                <ArticleCard
                    id={item.id}
                    title={item.title}
                    picture={item.picture}
                />
            }
        />
    )
}

const styles = StyleSheet.create({
    screen: {
        paddingBottom: SPACING.xxxl,
    },
});