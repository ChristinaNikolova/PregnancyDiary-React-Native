import { useCallback, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import JumboStart from '../components/home/JumboStart';
import JumboDiary from '../components/home/JumboDiary';
import ArticlesList from '../components/blog/ArticlesList';
import ShortcutIcon from '../components/shared/ShortcutIcon';
import Icon from '../components/shared/Icon';
import useFetch from '../hooks/useFetch';
import useAuthContext from '../contexts/auth/useAuthContext';
import useThemeContext from '../contexts/theme/useThemeContext';
import { homeMessages, httpMethods, shortcutsTiles } from '../utils/constants/global';
import { ROUTES } from '../navigation/routes';
import { apiPaths } from '../utils/constants/api';
import { SIZES, SPACING, TYPOGRAPHY } from '../theme';

export default function HomeScreen({ navigation }) {
    const isFirstFocus = useRef(true);
    const { user } = useAuthContext();
    const { theme } = useThemeContext();

    const url = `${apiPaths.DIARIES}/active`;
    const { values: diary, loading, execute } = useFetch(url);

    useFocusEffect(
        useCallback(() => {
            if (isFirstFocus.current) {
                isFirstFocus.current = false;
                return;
            }

            execute(url, httpMethods.GET)
                .catch((error) =>
                    Alert.alert("Error", error.message)
                );
        }, [execute])
    );

    const hasDiary = diary && Object.keys(diary).length > 0;

    const shortcuts = [
        {
            id: "weeks",
            title: shortcutsTiles.WEEKS,
            icon: "calendar-outline",
            handlePress: () =>
                navigation.navigate("WeeksNavigator", {
                    screen: "Weeks",
                    params: {
                        diaryId: diary.id,
                        dueDate: diary.dueDate,
                    },
                }),
        },
        {
            id: "memories",
            title: shortcutsTiles.MEMORIES,
            icon: "book-outline",
            handlePress: () => navigation.navigate("Memories"),
        },
        {
            id: "baby",
            title: shortcutsTiles.BABY,
            icon: "heart-outline",
            handlePress: () =>
                navigation.navigate("Baby", {
                    diaryId: diary.id,
                    isBabyBorn: diary.isBabyBorn,
                }),
        },
        {
            id: "favourites",
            title: shortcutsTiles.FAVOURITES,
            icon: "list-outline",
            handlePress: () => navigation.navigate(ROUTES.BLOG_TAB, {
                screen: "Blog",
                params: {
                    showFavourites: true,
                },
            }),
        },
    ];

    return (
        <SafeAreaView
            style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
            edges={["top", "left", "right"]}
        >
            <ScrollView
                style={[styles.container, { backgroundColor: theme.colors.background, }]}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <View>
                        <View style={styles.greetingContainer}>
                            <Text style={[styles.greeting, { color: theme.colors.text }]}>
                                {homeMessages.HELLO}{user.firstName}!
                            </Text>
                            <Icon
                                name="heart-outline"
                                size={SIZES.iconLarge}
                                color={theme.colors.primary} />
                        </View>
                        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>{homeMessages.WELCOME}</Text>
                    </View>
                </View>
                {hasDiary ?
                    <JumboDiary
                        id={diary.id}
                        title={diary.title}
                        dueDate={diary.dueDate}
                        gender={diary.gender}
                    />
                    : <JumboStart />
                }
                {
                    hasDiary && <View style={styles.shortcutsContainer}>
                        {shortcuts.map((item) => (
                            <ShortcutIcon
                                key={item.id}
                                title={item.title}
                                iconName={item.icon}
                                handlePress={item.handlePress}
                            />
                        ))}
                    </View>
                }
                <>
                    <View style={styles.sectionHeader}>
                        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                            {homeMessages.LATEST_BLOG}
                        </Text>
                    </View>
                    <ArticlesList limit={3} scrollEnabled={false} />
                </>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1
    },
    container: {
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal: SPACING.xl,
        paddingTop: SPACING.xl,
        paddingBottom: SPACING.xxxl,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: SPACING.xxl,
    },
    greetingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    greeting: {
        marginRight: SPACING.md,
        fontFamily: TYPOGRAPHY.fontFamily.bold,
        fontSize: TYPOGRAPHY.fontSize.title
    },
    subtitle: {
        marginTop: SPACING.xs,
        fontFamily: TYPOGRAPHY.fontFamily.semiBold,
        fontSize: TYPOGRAPHY.fontSize.sm,
    },
    shortcutsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: SPACING.xxl,
        marginBottom: SPACING.huge,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: SPACING.xxxl,
        marginBottom: SPACING.lg,
    },
    sectionTitle: {
        fontFamily: TYPOGRAPHY.fontFamily.bold,
        fontSize: TYPOGRAPHY.fontSize.xl,
        textTransform: "uppercase",
    },
});