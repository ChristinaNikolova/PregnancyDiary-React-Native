import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import useAuthContext from '../contexts/auth/useAuthContext';
import JumboStart from '../components/home/JumboStart';
import JumboDiary from '../components/home/JumboDiary';
import ArticlesList from '../components/blog/ArticlesList';
import ShortcutIcon from '../components/shared/ShortcutIcon';
import Icon from '../components/shared/Icon';
import useFetch from '../hooks/useFetch';
import { homeMessages, shortcutsTiles } from '../utils/constants/global';
import { ROUTES } from '../navigation/routes';
import { apiPaths } from '../utils/constants/api';
import { SIZES, SPACING, TYPOGRAPHY, COLORS } from '../theme';

export default function HomeScreen({ navigation }) {
    const { user } = useAuthContext();

    const { values: diary, loading } = useFetch(`${apiPaths.DIARIES}/active`);

    const hasDiary = diary && Object.keys(diary).length > 0;

    const shortcuts = [
        {
            id: 'weeks',
            title: shortcutsTiles.WEEKS,
            icon: 'calendar-outline',
            handlePress: () => navigation.navigate('Weeks'),
        },
        {
            id: 'memories',
            title: shortcutsTiles.MEMORIES,
            icon: 'book-outline',
            handlePress: () => navigation.navigate('Memories'),
        },
        {
            id: 'checklist',
            title: shortcutsTiles.CHECKLIST,
            icon: 'checkbox-outline',
            handlePress: () => navigation.navigate('Checklist'),
        },
        {
            id: 'favourites',
            title: shortcutsTiles.FAVOURITES,
            icon: 'heart-outline',
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
            style={styles.safeArea}
            edges={["top", "left", "right"]}
        >
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <View>
                        <View style={styles.greetingContainer}>
                            <Text style={styles.greeting}>
                                {homeMessages.HELLO}{user.firstName}!
                            </Text>
                            <Icon
                                name="heart-outline"
                                size={SIZES.iconLarge}
                                color={COLORS.primary} />
                        </View>
                        <Text style={styles.subtitle}>{homeMessages.WELCOME}</Text>
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
                        <Text style={styles.sectionTitle}>
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
        flex: 1,
        backgroundColor: COLORS.background,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
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
        fontSize: TYPOGRAPHY.fontSize.title,
        color: COLORS.text,
    },
    subtitle: {
        marginTop: SPACING.xs,
        fontFamily: TYPOGRAPHY.fontFamily.semiBold,
        fontSize: TYPOGRAPHY.fontSize.sm,
        color: COLORS.textSecondary,
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
        color: COLORS.text,
    },
});