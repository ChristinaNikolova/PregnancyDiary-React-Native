
import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import useAuthContext from '../contexts/auth/useAuthContext';
import ArticlesList from '../components/blog/ArticlesList';
import ShortcutIcon from '../components/shared/ShortcutIcon';
import Icon from '../components/shared/Icon';
import { ROUTES } from '../navigation/routes';
import { SIZES, SPACING, TYPOGRAPHY, COLORS } from '../theme';

export default function HomeScreen({ navigation }) {
    const { user } = useAuthContext();

    const shortcuts = [
        {
            id: 'weeks',
            title: 'Weeks',
            icon: 'calendar-outline',
            handlePress: () => navigation.navigate('Weeks'),
        },
        {
            id: 'memories',
            title: 'Memories',
            icon: 'book-outline',
            handlePress: () => navigation.navigate('Memories'),
        },
        {
            id: 'checklist',
            title: 'Checklist',
            icon: 'checkbox-outline',
            handlePress: () => navigation.navigate('Checklist'),
        },
        {
            id: 'favourites',
            title: 'Favourites',
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
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.header}>
                <View>
                    <View style={styles.greetingContainer}>
                        <Text style={styles.greeting}>
                            Hello, {user.firstName}!
                        </Text>
                        <Icon
                            name="heart-outline"
                            size={SIZES.iconLarge}
                            color={COLORS.primary} />
                    </View>
                    <Text style={styles.subtitle}>Welcome to PregnancyDiary!</Text>
                </View>
                {/* TODO add notifications */}
                {/* <View style={styles.notificationButton}>
                    <Icon name="notifications-outline" size={26} color={COLORS.brown} />
                    <View style={styles.notificationDot} />
                </View> */}
            </View>
            <ImageBackground
                source={require('../assets/images/welcome.png')}
                style={styles.emptyDiaryCard}
                imageStyle={styles.emptyDiaryImage}
                resizeMode="cover"
            >
                <View style={styles.emptyDiaryContent}>
                    <Text style={styles.emptyDiaryTitle}>
                        Все още нямаш дневник
                    </Text>

                    <Text style={styles.emptyDiaryDescription}>
                        Създай своя дневник на бременността и запази всички важни моменти на едно място.
                    </Text>

                    <View style={styles.createButton}>
                        <Icon name="add" size={24} color={COLORS.white} />
                        <Text style={styles.createButtonText}>
                            Създай дневник
                        </Text>
                    </View>
                </View>
            </ImageBackground>
            <View style={styles.shortcutsContainer}>
                {shortcuts.map((item) => (
                    <ShortcutIcon
                        key={item.id}
                        title={item.title}
                        iconName={item.icon}
                        handlePress={item.handlePress}
                    />
                ))}
            </View>
            <>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>
                        Newest articles in our blog
                    </Text>
                </View>
                <ArticlesList limit={3} scrollEnabled={false} />
            </>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
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
    // todo
    // notificationButton: {
    //     width: 44,
    //     height: 44,
    //     borderRadius: 22,
    //     backgroundColor: COLORS.peach,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     position: 'relative',
    // },
    // notificationDot: {
    //     position: 'absolute',
    //     top: 8,
    //     right: 9,
    //     width: 8,
    //     height: 8,
    //     borderRadius: 4,
    //     backgroundColor: '#D94A4A',
    // },

    // Empty Diary Card
    emptyDiaryContent: {
        width: '70%',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        paddingHorizontal: 18,
        paddingVertical: 20,
        backgroundColor: 'rgba(255, 248, 241, 0.30)',
    },

    emptyDiaryTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#49352F',
        marginBottom: 12,
        textAlign: 'center'
    },

    emptyDiaryDescription: {
        fontSize: 15,
        lineHeight: 22,
        color: '#49352F',
        fontWeight: '500',
        marginBottom: 18,
        textAlign: 'center',
    },

    createButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#B87578',
        borderRadius: 30,
        paddingVertical: 13,
        paddingHorizontal: 10,
    },

    createButtonText: {
        color: COLORS.white,
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 5,
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
        marginBottom: SPACING.lg,
    },
    sectionTitle: {
        fontFamily: TYPOGRAPHY.fontFamily.bold,
        fontSize: TYPOGRAPHY.fontSize.xl,
        textTransform: "uppercase",
        color: COLORS.text,
    },
});