
import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import useAuthContext from '../contexts/auth/useAuthContext';
import { COLORS } from '../theme/colors';
import Icon from '../components/shared/Icon';
import { SIZES, SPACING, TYPOGRAPHY } from '../theme';

const shortcuts = [
    { id: 'memories', title: 'Спомени', icon: 'book-outline' },
    { id: 'favourites', title: 'Любими', icon: 'heart-outline' },
    { id: 'weeks', title: 'Седмици', icon: 'calendar-outline' },
    { id: 'checklist', title: 'Checklist', icon: 'checkbox-outline' },
];

export default function HomeScreen() {
    const { user } = useAuthContext();

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

            {/* Shortcuts */}
            <View style={styles.shortcutsContainer}>
                {shortcuts.map((item) => (
                    <View key={item.id} style={styles.shortcut}>
                        <View style={styles.shortcutIconContainer}>
                            <Icon
                                name={item.icon}
                                size={30}
                                color={COLORS.brown}
                            />
                        </View>

                        <Text style={styles.shortcutTitle}>
                            {item.title}
                        </Text>
                    </View>
                ))}
            </View>

            {/* Recommended Articles */}
            <View style={styles.recommendedSection}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>
                        Препоръчано за теб
                    </Text>

                    <Text style={styles.seeAllText}>
                        Виж всички →
                    </Text>
                </View>

                <View style={styles.articleCard}>
                    <Image
                        source={require('../assets/images/welcome.png')}
                        style={styles.articleImage}
                        resizeMode="cover"
                    />

                    <View style={styles.articleContent}>
                        <Text style={styles.articleCategory}>
                            БРЕМЕННОСТ
                        </Text>

                        <Text style={styles.articleTitle}>
                            Хранене през втори триместър
                        </Text>
                    </View>
                </View>
            </View>
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

    // Shortcuts
    shortcutsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 35,
    },

    shortcut: {
        flex: 1,
        alignItems: 'center',
    },

    shortcutIconContainer: {
        width: 68,
        height: 68,
        borderRadius: 23,
        backgroundColor: COLORS.peach,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 9,
    },

    shortcutTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: COLORS.text,
        textAlign: 'center',
    },

    // Recommended Articles
    recommendedSection: {
        marginBottom: 20,
    },

    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },

    sectionTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: COLORS.text,
    },

    seeAllText: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.darkPink,
    },

    articleCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.card,
        borderRadius: 22,
        overflow: 'hidden',
    },

    articleImage: {
        width: 125,
        height: 120,
    },

    articleContent: {
        flex: 1,
        padding: 14,
    },

    articleCategory: {
        fontSize: 11,
        fontWeight: '700',
        color: COLORS.darkPink,
        marginBottom: 8,
        letterSpacing: 1,
    },

    articleTitle: {
        fontSize: 17,
        fontWeight: '700',
        lineHeight: 24,
        color: COLORS.text,
    },
});