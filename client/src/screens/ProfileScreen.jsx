import { Image, StyleSheet, View, Text, ScrollView } from "react-native";
import ProfileRow from "../components/profile/ProfileRow";
import useAuthContext from "../contexts/auth/useAuthContext";
import { useThemeContext } from "../contexts/theme/useThemeContext";
import { ROUTES } from "../navigation/routes";
import { BORDERS, COLORS, SIZES, SPACING, TYPOGRAPHY } from "../theme";

// todo notifications
export default function ProfileScreen({ navigation }) {
    const { user, logout } = useAuthContext();
    const { isDarkMode, toggleTheme } = useThemeContext();

    const handleFavouritesPress = () => {
        navigation.navigate(ROUTES.BLOG_TAB, {
            screen: "Blog",
            params: {
                showFavourites: true,
            },
        });
    };

    const handleMyProfilePress = () => {
        navigation.navigate("UpdateProfile");
    };

    const menuItems = [
        {
            id: "profile",
            title: "My profile",
            iconName: "person-outline",
            iconSize: SIZES.iconMedium,
            iconColor: COLORS.textSecondary,
            onPress: handleMyProfilePress,
        },
        {
            id: "favorites",
            title: "Favourite articles",
            iconName: "heart-outline",
            iconSize: SIZES.iconMedium,
            iconColor: COLORS.textSecondary,
            onPress: handleFavouritesPress,
        },
        {
            id: "theme",
            title: "Dark theme",
            iconName: "moon-outline",
            iconSize: SIZES.iconMedium,
            iconColor: COLORS.textSecondary,
            isSwitch: true,
            switchValue: isDarkMode,
            onPress: toggleTheme,
        },
        {
            id: "logout",
            title: "Logout",
            iconName: "log-out-outline",
            iconSize: SIZES.iconMedium,
            iconColor: COLORS.error,
            onPress: logout,
        }
    ];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.userContainer}>
                <Image
                    source={
                        user.picture?.url
                            ? { uri: user.picture.url }
                            : require("../assets/images/default_profile_image.png")
                    }
                    style={styles.avatar}
                />
                <View style={styles.userInfo}>
                    <Text style={styles.userName}>
                        {user.firstName} {user.lastName}
                    </Text>
                    <Text style={styles.email}>{user.email}</Text>
                </View>
            </View>
            <View style={styles.menu}>
                {menuItems.map((item) => (
                    <ProfileRow
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        iconName={item.iconName}
                        iconSize={item.iconSize}
                        iconColor={item.iconColor}
                        isSwitch={item.isSwitch}
                        switchValue={item.switchValue}
                        handlePress={item.onPress}
                    />
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.xl,
        backgroundColor: COLORS.background,
    },
    userContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.md,
        paddingBottom: SPACING.lg,
        borderBottomWidth: BORDERS.width.thin,
        borderBottomColor: COLORS.border,
    },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: BORDERS.radius.round,
    },
    userInfo: {
        flex: 1,
        gap: SPACING.xs,
    },
    userName: {
        fontFamily: TYPOGRAPHY.fontFamily.semiBold,
        fontSize: TYPOGRAPHY.fontSize.md,
        color: COLORS.text,
    },
    email: {
        fontFamily: TYPOGRAPHY.fontFamily.regular,
        fontSize: TYPOGRAPHY.fontSize.sm,
        color: COLORS.textSecondary,
    },
    menu: {
        marginTop: SPACING.sm,
        paddingHorizontal: SPACING.md,
        borderRadius: BORDERS.radius.xl,
        backgroundColor: COLORS.surface,
    },
});