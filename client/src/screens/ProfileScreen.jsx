import { Image, Pressable, StyleSheet, View, Text, ScrollView } from "react-native";
import Icon from "../components/shared/Icon";
import useAuthContext from "../contexts/auth/useAuthContext";
import { BORDERS, COLORS, SIZES, SPACING, TYPOGRAPHY } from "../theme";
import { ROUTES } from "../navigation/routes";

// todo notifications, setting.....
export default function ProfileScreen({ navigation }) {
    const { user, logout } = useAuthContext();

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
    }

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
            title: "Favourrites articles",
            iconName: "heart-outline",
            iconSize: SIZES.iconMedium,
            iconColor: COLORS.textSecondary,
            onPress: handleFavouritesPress,
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
                    source={require("../assets/images/default_profile_image.png")}
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
                    <Pressable
                        key={item.id}
                        style={styles.menuItem}
                        onPress={item.onPress}
                    >
                        <View style={styles.menuItemView}>
                            <Icon
                                name={item.iconName}
                                size={item.iconSize}
                                color={item.iconColor}
                            />
                            <Text style={styles.menuText}>{item.title}</Text>
                        </View>
                        {item.title.toLocaleLowerCase() !== "logout" ? (
                            <Icon
                                name="chevron-forward"
                                size={SIZES.iconSmall}
                                color={COLORS.textSecondary}
                            />
                        ) : null}
                    </Pressable>
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
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: 58,
        borderBottomWidth: BORDERS.width.thin,
        borderBottomColor: COLORS.border,
    },
    menuItemView: {
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.md,
    },
    menuText: {
        fontFamily: TYPOGRAPHY.fontFamily.medium,
        fontSize: TYPOGRAPHY.fontSize.sm,
        color: COLORS.text,
    },
});